import React from 'react'
import { graphql } from 'gatsby'
import Caption from '../components/Caption'
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"

const shortcodes = { Caption }

export default function PageTemplate( { data, pageContext } ) {
    
    const { mdx } = data
    const title = mdx.frontmatter.title
    const timeToRead = mdx.timeToRead
    const relativeDate = mdx.frontmatter.date

    return (
          
        <div>
            <div id='middle-column' className='container-md'>
                <div>
                    <h1 style={{fontFamily:"Georgia", marginBottom:"8px"}}>{title}</h1>
                </div>
                <p><small className="text-muted">{relativeDate} · {timeToRead} min read</small></p>
                <div className='blogpost'>
                    <MDXProvider components={shortcodes}>
                        <MDXRenderer>{mdx.body}</MDXRenderer>
                    </MDXProvider>
                </div>
            </div>        
            
        </div> 
    )
}

export const pageQuery = graphql`
    query($pathSlug:String!){
        mdx(fields: { slug: { eq: $pathSlug} }){
            id
            body
            frontmatter {
                title
                date (fromNow: true)
            }
            timeToRead
        }
    }
`