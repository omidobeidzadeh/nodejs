const settingModel = require('../../models/setting')
const settingConfig = require('../../config/settings')
exports.index = async (req, res) => {
  const settings = await settingModel.findAll()
  const presentedSetting = {}
  settings.forEach(item => {
    presentedSetting[item.setting_name] = item.setting_value 
  })
  res.adminRender('admin/settings/index', { config: presentedSetting, helpers: {
    IsChecked: function(value, options){
      return parseInt(value) === 1 ? options.fn(this) : options.inverse(this)
    }
  } })
}
exports.store = async (req, res) => {
  const settings = req.body
  const permitedSettingKey = Object.keys(settings).filter(setting => {
    return Object.keys(settingConfig).includes(setting)
  })
  const permitedSetting = {}
  permitedSettingKey.forEach(item => {
    permitedSetting[item] = settings[item]
  })

  const validatedSettings = {...settingConfig, ...permitedSetting}
  const result = await settingModel.update(validatedSettings)
  res.redirect('/admin/settings')
}
