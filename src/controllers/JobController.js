const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
  create: (req, res) => res.render('job'),
  save: async (req, res) => {
    await Job.create({
      name: req.body.name,
      'daily-hours': req.body['daily-hours'],
      'total-hours': req.body['total-hours'],
      created_at: Date.now() // atraindo o timestamp do servidor
    })

    return res.redirect('/')
  },
  show: async (req, res) => {
    const jobId = req.params.id
    const getJobs = await Job.get()
    const getProfile = await Profile.get()

    const job = getJobs.find(job => Number(job.id) === Number(jobId))

    if (!job) {
      return res.send('Job not found')
    }

    job.budget = JobUtils.calculateBudget(job, getProfile['value-hour'])

    return res.render('job-edit', { job })
  },
  update: async (req, res) => {
    const jobId = req.params.id

    const updatedJob = {
      name: req.body.name,
      'total-hours': req.body['total-hours'],
      'daily-hours': req.body['daily-hours']
    }

    await Job.update(updatedJob, jobId)

    res.redirect('/job/' + jobId)
  },
  delete: (req, res) => {
    const jobId = req.params.id

    Job.delete(jobId)

    return res.redirect('/')
  }
}
