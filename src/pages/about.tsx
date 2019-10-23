import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'

import Divider from '@components/Divider'
import Layout from '@components/Layout'
import SEO from '@components/SEO'

import media from '@styles/media'
import { getOffsetTop, useScrollPosition } from '@utils'

import AboutHero from '../sections/about/About.Hero'
import AboutTeam from '../sections/about/About.Team'
import AboutValues from '../sections/about/About.Values'
import AboutPhotographs from '../sections/about/About.Photographs'
import AboutTestimonial from '../sections/about/About.Testimonials'
import AboutStudioLabs from '../sections/about/About.StudioLabs'
import AboutContact from '../sections/about/About.Contact'

const pageQuery = graphql`
  {
    allContentfulPage(filter: { pageName: { eq: "About" } }) {
      edges {
        node {
          seo {
            title
            description
            image {
              file {
                url
              }
            }
          }
        }
      }
    }
  }
`

function AboutPage({ location }) {
  const { allContentfulPage } = useStaticQuery(pageQuery)
  const contentful = allContentfulPage.edges[0].node

  const [inView, setInView] = useState(false)
  const position = useScrollPosition()
  const ref = useRef()

  useEffect(() => {
    const offsetTop = getOffsetTop(ref.current)
    setInView(position + 100 > offsetTop)

    console.log({ position, offsetTop })
  }, [ref, position])

  const pageBackground =
    'linear-gradient(#08080B,rgb(17, 18, 22) 60%,#08080b 100%)'

  const navConfig = {
    offset: true,
    fixed: true,
    theme: 'light',
  }

  const footerConfig = {
    visible: true,
    theme: 'light',
  }

  return (
    <Layout background={pageBackground} nav={navConfig} footer={footerConfig}>
      <SEO
        title={contentful.seo.title}
        description={contentful.seo.description}
        image={contentful.seo.image.file.url}
        pathname={location.pathname}
      />

      <HeroGradient>
        <AboutHero />
      </HeroGradient>
      <TeamGradient>
        <AboutTeam />
        <Divider />
      </TeamGradient>
      <TransitionLayer style={{ opacity: inView ? 1 : 0 }} />
      <MiddleGradient>
        <AboutValues />
      </MiddleGradient>
      <BottomGradient>
        <AboutPhotographs />
        <AboutTestimonial />
        <AboutStudioLabs />
        <div ref={ref} style={{ position: 'relative', zIndex: inView ? 2 : 1 }}>
          <AboutContact inView={inView} />
        </div>
      </BottomGradient>
    </Layout>
  )
}

export default AboutPage

const HeroGradient = styled.div`
  background: linear-gradient(#08080b, #13151a);
  overflow-x: hidden;
`

const TeamGradient = styled.div`
  background: linear-gradient(#13151a 75%, #191d23);
`

const MiddleGradient = styled.div`
  background: #111216;
`

const BottomGradient = styled.div`
  background: linear-gradient(#111216, #08080b);
`

const TransitionLayer = styled.div`
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #d8d7d8;
  z-index: 1;
  transition: opacity 1s;
  will-change: opacity;

  ${media.tablet`
    &::before {
      content: '';
      position: absolute;
      height: 549px;
      bottom: -549px;
      background: #d8d7d8;
      z-index: 1;
    }
  `}
`
