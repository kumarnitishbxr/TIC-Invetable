import React from "react";
import JobCard from "../components/Jobcard";
import axiosClient from "../API/axiosClient";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";



export default function Jobs() {

  const [jobList, setJobList] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchJobs = async () => {
    try{
    const response = await axiosClient.get('/jobs');
    // console.log('response',response?.data);
    setJobList(response.data.data);
    setLoading(false);
    }catch(error){
    console.error('Error fetching jobs:', error);
    setLoading(false);
   }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleApply = (job) => {
    alert(`You applied for ${job.title}`);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Available Jobs
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        { loading ? (
          <div className="col-span-full p-12 bg-linear-to-br from-white to-slate-50 border-2 border-dashed border-slate-300 rounded-3xl text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-slate-400 animate-spin" />
            </div>
            <p className="text-slate-600 font-medium">Loading jobs...</p>
          </div>
        ) : jobList?.length > 0 && jobList?.map((job, index) => (
          <JobCard key={index} job={job} onApply={handleApply} />
        ))}
        { jobList?.length === 0 ? (
          <div className="col-span-full p-12 bg-linear-to-br from-white to-slate-50 border-2 border-dashed border-slate-300 rounded-3xl text-center">
            <p className="text-slate-600 font-medium">No jobs found. Try clearing filters or expand your search radius.</p>
          </div>
        ) : jobList?.length > 0 ? (
          <div className="col-span-full p-12 bg-linear-to-br from-white to-slate-50 border-2 border-dashed border-slate-300 rounded-3xl text-center">
            <p className="text-slate-600 font-medium">No jobs found. Try clearing filters or expand your search radius.</p>
          </div>
        ) : null}
      </div>
    </main>
  );
}
