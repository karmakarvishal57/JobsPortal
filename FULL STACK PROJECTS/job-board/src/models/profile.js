import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  userId: String,
  email:String,
  role: String,
  isPremiumUser: Boolean,
  memberShipType: String,
  memberShipStartDate: String,
  memberShipEndDate: String,
  recruiter: {
    name: String,
    companyName: String,
    companyRole: String,
  },
  candidate: {
    resume: String,
    name: String,
    currentCompany: String,
    currentJobLocation: String,
    preferedJobLocation: String,
    currentSalary: String,
    noticePeriod: String,
    skills: String,
    totalExperience: String,
    college: String,
    collegeLocation: String,
    graduatedYear: String,
    linkedinProfile: String,
    githubProfile: String,
  },
});

export const Profile =
  mongoose.models.Profile || mongoose.model("Profile", ProfileSchema);
