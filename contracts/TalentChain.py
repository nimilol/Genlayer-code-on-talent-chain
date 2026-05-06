# { "Depends": "py-genlayer:1jb45aa8ynh2a9c9xn3b7qqh8sm5q93hwfp7jqmwsfhh8jpz09h6" }
from genlayer import *
from dataclasses import dataclass
import json
import typing

@allow_storage
@dataclass
class JobPosting:
    id: u256
    title: str
    employer: Address
    industry: str
    description: str
    criteria: str
    is_active: bool

@allow_storage
@dataclass
class Application:
    job_id: u256
    candidate: Address
    resume_text: str
    score: u32
    analysis: str
    status: str # "PENDING", "SCREENED"

class TalentChain(gl.Contract):
    jobs: DynArray[JobPosting]
    applications: DynArray[Application]
    job_count: u256

    def __init__(self):
        self.job_count = u256(0)

    @gl.public.write
    def post_job(self, title: str, industry: str, description: str, criteria: str) -> u256:
        job_id = self.job_count
        new_job = JobPosting(
            id=job_id,
            title=title,
            employer=gl.message.sender_address,
            industry=industry,
            description=description,
            criteria=criteria,
            is_active=True
        )
        self.jobs.append(new_job)
        self.job_count = self.job_count + u256(1)
        return job_id

    @gl.public.write
    def apply_for_job(self, job_id: u256, resume_text: str) -> None:
        # 1. Find the job
        # (For simplicity we iterate or use job_id as index if valid)
        job_idx = int(job_id)
        if job_idx >= len(self.jobs):
            raise gl.vm.UserError("Job not found")
        
        job = self.jobs[job_idx]
        if not job.is_active:
            raise gl.vm.UserError("Job is no longer active")

        # 2. AI Screening logic
        # We define leader and validator functions for consensus ranking
        
        prompt = f"""
        You are an elite decentralized recruiter for TalentChain.
        Evaluate the following candidate application against the job requirements.
        
        JOB TITLE: {job.title}
        JOB DESCRIPTION: {job.description}
        EMPLOYER CRITERIA: {job.criteria}
        
        CANDIDATE RESUME:
        {resume_text}
        
        Provide your evaluation as JSON:
        {{
            "score": <int 0-100 indicating match quality>,
            "analysis": "<short 1-2 sentence explanation of why the candidate received this score>"
        }}
        """

        def leader_fn():
            return gl.nondet.exec_prompt(prompt, response_format="json")

        def validator_fn(leader_result: gl.vm.Result) -> bool:
            if not isinstance(leader_result, gl.vm.Return):
                return False
            
            # Re-run and check if results are semantically equivalent
            # For recruiting, we allow a small tolerance in score
            my_res = leader_fn()
            leader_data = leader_result.calldata
            
            score_diff = abs(int(leader_data["score"]) - int(my_res["score"]))
            # Agree if score is within 5 points
            return score_diff <= 5

        # Execute non-deterministic AI ranking
        screening_result = gl.vm.run_nondet_unsafe(leader_fn, validator_fn)
        
        # 3. Save application with AI score
        new_app = Application(
            job_id=job_id,
            candidate=gl.message.sender_address,
            resume_text=resume_text,
            score=u32(screening_result["score"]),
            analysis=screening_result["analysis"],
            status="SCREENED"
        )
        self.applications.append(new_app)

    @gl.public.view
    def get_jobs(self) -> list:
        return [j for j in self.jobs]

    @gl.public.view
    def get_job_applications(self, job_id: u256) -> list:
        # Filter applications for a specific job
        results = []
        for app in self.applications:
            if app.job_id == job_id:
                results.append(app)
        # Sort by score descending
        results.sort(key=lambda x: x.score, reverse=True)
        return results

    @gl.public.view
    def get_my_applications(self, candidate_addr: Address) -> list:
        return [app for app in self.applications if app.candidate == candidate_addr]
