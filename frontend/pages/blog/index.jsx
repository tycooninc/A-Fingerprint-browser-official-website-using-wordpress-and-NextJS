import React from "react";
import BlogList from "../../components/blog/list";
import {NextSeo} from "next-seo"
import {getBlogIndex} from "../../lib/api";
import Navigation from "../../components/Navigation";

export const getStaticProps = async ({locale}) => {
    let posts

    if(locale){
        posts = await getBlogIndex(locale)
    }

    return {
        props:{
            posts
        },
        revalidate:10
    }
}

const Blog = ({text, posts}) => {

    const SEO = {
        title: text[9][0],
        description:text[9][2],
        openGraph:{
            title:text[9][0],
            description: text[9][2]
        }
    }

    return (
        <div className="pt-20 mb-32">
            <NextSeo {...SEO}/>
            <Navigation title={'blog'} nav_array={posts.nav_array}/>
                        {posts?.cat.map((post, id) => (
                            <div key={id}>
                                <h1 className="text-3xl font-bold text-center my-10"><a href={"/"+post.cat_slug}>{post.cat_name}</a></h1>
                            <div className="flex flex-wrap max-w-[85%] mx-auto" key={id}>
                                {post.posts.map((post, id) => (
                                        <div className="w-full md:w-1/3 lg:w-1/4 px-2" key={id}>
                                        <BlogList post={post} key={id}/>
                                        </div>
                             ))}
                            </div>
                            </div>
                        ))}
        </div>
    )
}

export default Blog