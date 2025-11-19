import mongoose from "mongoose";

const JobsSchema = new mongoose.Schema({
  companyName: String,
  companyRole: String,
  location: String,
  title: String,
  jobType: String,
  experience: String,
  skills: String,
  recruiterId: String,
  applicants: [
    {
      name: String,
      email: String,
      userId: String,
      status: String,
    },
  ],
});

const Jobs = mongoose.models.Jobs || mongoose.model("Jobs", JobsSchema);
export default Jobs;