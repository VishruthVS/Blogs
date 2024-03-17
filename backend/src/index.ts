import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { sign } from 'hono/jwt';

// Create the main Hono app
const app = new Hono<{
  Bindings:{
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>();

app.post('/api/v1/user/signup', async(c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())
try{
const user=await prisma.user.create({
			data: {
				username: body.username,
				password: body.password,
        name:body.name
			}
		});
    const jwt=await sign({
      id: user.id,
    },c.env.JWT_SECRET)
    return c.text('signup route complete, JWT: '+jwt);
    
}catch(e){
  c.status(411);
  return c.text('Invalid:'+e);
}
	
})

app.post('/api/v1/user/signin', async(c) => {

	const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())
try{
const user=await prisma.user.findFirst({
			where: {
				username: body.username,
				password: body.password,
			}
		});
    if(!user){
      c.status(403);
      return c.json({
        error:'Invalid username or password'
      
      })
    }
    const jwt=await sign({
      id: user.id,
    },c.env.JWT_SECRET)
    return c.text('signin route complete, JWT: '+jwt);
    
}catch(e){
  c.status(411);
  console.log(e);
}
})

app.get('/api/v1/blog/:id', (c) => {
	const id = c.req.param('id')
	console.log(id);
	return c.text('get blog route')
})

app.post('/api/v1/blog', (c) => {

	return c.text('signin route')
})

app.put('/api/v1/blog', (c) => {
	return c.text('signin route')
})
app.get('/api/v1/blog', (c) => {

	return c.text('signin route')
})


export default app;
