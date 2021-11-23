const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
  index: async (req, res) => {
    const getJobs = await Job.get()
    const getProfile = await Profile.get()

    const statusCount = {
      progress: 0,
      done: 0,
      total: getJobs.length
    }

    let jobTotalHours = 0

    const updatedJobs = getJobs.map(job => {
      const remaining = JobUtils.remainingDays(job)
      const status = remaining > 0 ? 'progress' : 'done'

      statusCount[status]++

      jobTotalHours =
        status === 'progress'
          ? jobTotalHours + Number(job['daily-hours'])
          : jobTotalHours

      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, getProfile['value-hour'])
      }
    })

    const freeHours = getProfile['hours-per-day'] - jobTotalHours

    return res.render('index', {
      jobs: updatedJobs,
      profile: getProfile,
      statusCount, // statusCount: statusCount
      freeHours
    })
  }
}
