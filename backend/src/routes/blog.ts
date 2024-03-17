import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { verify } from 'hono/jwt';
export const blogRouter=new  Hono<{
  Bindings:{
    DATABASE_URL: string
    JWT_SECRET: string
  },
  Variables:{
    userId:string
  }
}>();
blogRouter.use("/*",async(c,next)=>{
    const authHeader=c.req.header('authorization')||"";
    const user=await verify(authHeader,c.env.JWT_SECRET);
    if(user){
        c.set("userId",user.id);
    await  next();
    }else{
        c.status(403);
        return c.json({error:"You are not logged in"})
    }

})

blogRouter.post('/', async(c) => {
	const body = await c.req.json();
    const authorId=c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())
const blog = await prisma.blog.create({
		data: {
			title: body.title,
			content: body.content,
			authorId: Number(authorId)
		}
	});
    
	return c.json({"blog route":blog.id});
})

blogRouter.put('/', async(c) => {
    // the id should be provided as an integer not a string
    	const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())

try{
    const blog = await prisma.blog.update({
    where:{
        id:body.id
    },
		data: {
			title: body.title,
			content: body.content,
			
		}
	});
    
	return c.json({"blog put route":blog.id});
}
catch(e){
    console.log(e);
    return c.json({message:"error fetching blog posts"});
}


})
//should add pagination
blogRouter.get('/bulk', async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())
const blogs=await prisma.blog.findMany();
	return c.json({
        blogs
    })
})
blogRouter.get('/:id', async(c) => {
		  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())
const blog = await prisma.blog.findFirst({
    where:{
        id: Number(id)
    },
		
	});
    
	return c.json({"blog get route":blog});

	
})
