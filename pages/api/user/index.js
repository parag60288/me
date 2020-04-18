import content from '../../../lib/content'

const notFound = (res, payload) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  return res.end(payload)
} 

export default async(req, res) => {
  let options = {
    lang: req.query.lang ? req.query.lang.toString() : null
  } 
  console.log(req)
  console.log(req.query)
  let profile = await content.getContentFromGithub(req.query.username, options).catch(e => {})
  if(!profile) return notFound(res, JSON.stringify({ error: 'profile not found' }))
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(profile))
}