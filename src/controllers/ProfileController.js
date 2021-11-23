const Profile = require('../model/Profile')

module.exports = {
  index: async (req, res) =>
    res.render('profile', { profile: await Profile.get() }),
  update: async (req, res) => {
    // req.body para pegar os dados
    // definir quantas semanas tem num ano
    // remover as semanas de férias do ano
    // quantas horas por semana estout rabalhando
    // total de horas trabalhadas no mês
    const data = req.body
    const weeksPerYear = 52
    const weeksPerMonth = (weeksPerYear - data['vacation-per-year']) / 12
    const hoursPerWeek = data['hours-per-day'] * data['days-per-week']
    const hoursPerMonth = hoursPerWeek * weeksPerMonth

    const valuePerHour = data['monthly-budget'] / hoursPerMonth

    const profile = await Profile.get()

    Profile.update({
      ...profile,
      ...data, // espalha os dados de data por cima do Profile.get(), alterando ou adicionando novos campos
      'value-hour': valuePerHour
    })
    return res.redirect('/profile')
  }
}
