import React, { useState, useRef, createRef, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import usePortal from 'react-useportal'
import { useStaticQuery, graphql } from 'gatsby'
import SVG from 'react-inlinesvg'
import OutsideClickHandler from 'react-outside-click-handler'
import { Motion, spring } from 'react-motion'

import Heading from '@components/Heading'
import Section from '@components/Section'
import Sticky, { StickyState } from '@components/Sticky'
import Image from '@components/Image'
import SocialLinksDynamic from '@components/SocialLinks/SocialLinks.Dynamic'

import media from '@styles/media'
import { scrollable, useResize } from '@utils'
import { ExIcon, ChevronRightIcon, ChevronLeftIcon } from '../../icons/ui/index'
import { IGraphqlSharpFluidImage, IStaticImage } from '../../types/index'

import AboutTeamModal from './About.Team.Modal'
import AboutBackground from './About.Background'

interface Person {
  name: string
  role: string
  illustration: IGraphqlSharpFluidImage
  signature: IStaticImage
  about: string[]
  social: string[]
}

export const illustrationQuery = graphql`
  query GetIllustrations {
    brad: file(name: { regex: "/portrait-illustration-brad/" }) {
      childImageSharp {
        fluid(maxWidth: 1170, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    bradSig: file(name: { regex: "/brad-signature/" }) {
      publicURL
    }
    dan: file(name: { regex: "/portrait-illustration-dan/" }) {
      childImageSharp {
        fluid(maxWidth: 1170, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    danSig: file(name: { regex: "/dan-signature/" }) {
      publicURL
    }
    dennis: file(name: { regex: "/portrait-illustration-dennis/" }) {
      childImageSharp {
        fluid(maxWidth: 1170, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    dennisSig: file(name: { regex: "/dennis-signature/" }) {
      publicURL
    }
    mack: file(name: { regex: "/portrait-illustration-mack/" }) {
      childImageSharp {
        fluid(maxWidth: 1170, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    mackSig: file(name: { regex: "/mack-signature/" }) {
      publicURL
    }
    thiago: file(name: { regex: "/portrait-illustration-thiago/" }) {
      childImageSharp {
        fluid(maxWidth: 1170, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    thiagoSig: file(name: { regex: "/thiago-signature/" }) {
      publicURL
    }
    breatherLogo: file(name: { regex: "/company-logo-breather/" }) {
      publicURL
    }
  }
`

function AboutTeam() {
  const illustrations = useStaticQuery(illustrationQuery)

  const people: Person[] = [
    {
      name: 'Thiago Costa',
      role: 'Brand and Design',
      illustration: illustrations.thiago,
      signature: illustrations.thiagoSig.publicURL,
      about: [
        ' I’ve been crafting digital experiences for humans for the past ten years, having the honour to contribute on the growth of companies like Hopper, Lightspeed, Breather among others.',
        'During this journey I had the opportunity to meet the most talented group of people, and build a world-class team to develop startups. ',
        'Phasellus aliquet mollis felis, sed vehicula urna sodales at. Cras cursus semper lorem sit amet tempor. Duis nec lacus orci.',
      ],
      social: [
        'https://twitter.com/tcosta_co',
        'https://dribbble.com/tcosta',
        'https://www.linkedin.com/in/tcosta-co/',
        'https://www.instagram.com/tcosta.co/',
      ],
    },
    {
      name: 'Brad Tiller',
      role: 'Marketing and Growth',
      illustration: illustrations.brad,
      signature: illustrations.bradSig.publicURL,
      about: [
        ' I’ve been crafting digital experiences for humans for the past ten years, having the honour to contribute on the growth of companies like Hopper, Lightspeed, Breather among others.',
        'During this journey I had the opportunity to meet the most talented group of people, and build a world-class team to develop startups. ',
        'Phasellus aliquet mollis felis, sed vehicula urna sodales at. Cras cursus semper lorem sit amet tempor. Duis nec lacus orci.',
      ],
      social: [
        'https://twitter.com/bradtiller',
        'https://www.linkedin.com/in/bradtiller/',
      ],
    },
    {
      name: 'Dennis Brotzky',
      role: 'Frontend Engineering',
      illustration: illustrations.dennis,
      signature: illustrations.dennisSig.publicURL,
      about: [
        ' I’ve been crafting digital experiences for humans for the past ten years, having the honour to contribute on the growth of companies like Hopper, Lightspeed, Breather among others.',
        'During this journey I had the opportunity to meet the most talented group of people, and build a world-class team to develop startups. ',
        'Phasellus aliquet mollis felis, sed vehicula urna sodales at. Cras cursus semper lorem sit amet tempor. Duis nec lacus orci.',
      ],
      social: [
        'https://twitter.com/_brotzky',
        'https://dribbble.com/brotzky',
        'https://github.com/brotzky',
        'https://www.linkedin.com/in/dennis-brotzky/',
      ],
    },

    {
      name: 'Dan Le Van',
      role: 'Backend Engineering',
      illustration: illustrations.dan,
      signature: illustrations.danSig.publicURL,
      about: [
        ' I’ve been crafting digital experiences for humans for the past ten years, having the honour to contribute on the growth of companies like Hopper, Lightspeed, Breather among others.',
        'During this journey I had the opportunity to meet the most talented group of people, and build a world-class team to develop startups. ',
        'Phasellus aliquet mollis felis, sed vehicula urna sodales at. Cras cursus semper lorem sit amet tempor. Duis nec lacus orci.',
      ],
      social: [
        'https://twitter.com/8lueberry ',
        'https://github.com/8lueberry',
        'https://www.instagram.com/_blu38erry/',
        'https://www.linkedin.com/in/levan/',
      ],
    },
    {
      name: 'Mack Mansouri',
      role: 'Operations and Partnerships',
      illustration: illustrations.mack,
      signature: illustrations.mackSig.publicURL,
      about: [
        ' I’ve been crafting digital experiences for humans for the past ten years, having the honour to contribute on the growth of companies like Hopper, Lightspeed, Breather among others.',
        'During this journey I had the opportunity to meet the most talented group of people, and build a world-class team to develop startups. ',
        'Phasellus aliquet mollis felis, sed vehicula urna sodales at. Cras cursus semper lorem sit amet tempor. Duis nec lacus orci.',
      ],
      social: [
        'https://twitter.com/macknarative',
        'https://www.linkedin.com/in/mackmansouri',
        'https://www.instagram.com/mack_os',
      ],
    },
  ]

  const [childRef, setChildRef] = useState()
  const cardsRef = useRef()
  const cardRefs = useRef([...Array(people.length)].map(() => createRef()))

  const [selectedPersonIndex, setSelectedPersonIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [horizontalOffset, setHorizontalOffset] = useState(0)

  const { Portal } = usePortal()
  const { width } = useResize()

  const person = people[selectedPersonIndex]

  function handleRef(ref: any) {
    setChildRef(ref)
  }

  function handleSetSelectedPersonIndex(index: number) {
    if (cardRefs.current[index]) {
      setSelectedPersonIndex(index)

      const el: React.RefObject<any> = cardRefs.current[index]
      const box = el.current.getBoundingClientRect()

      if (childRef.current) {
        childRef.current.style.top = `${box.y}px`
        childRef.current.style.left = `${box.x}px`
      }
    }
  }

  function handleModalToggle(open: boolean, index?: number) {
    if (typeof index === 'number') {
      handleSetSelectedPersonIndex(index)
    }

    setIsOpen(open)

    if (open) {
      scrollable('disable')
    } else {
      document.body.style.pointerEvents = 'none'

      setTimeout(() => {
        document.body.style.pointerEvents = ''
        scrollable('enable')
      }, 460)
    }
  }

  useEffect(() => {
    function handleEscKeyPress(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        handleModalToggle(false)
      }
    }

    window.addEventListener('keydown', handleEscKeyPress)
    return () => window.removeEventListener('keydown', handleEscKeyPress)
  }, [])

  useEffect(() => {
    if (cardsRef.current) {
      const GAP_BETWEEN_CARDS = 80

      const $cards = cardsRef.current
      const { width: cardsWidth } = $cards.getBoundingClientRect()
      const { width: cardWidth } = $cards.firstChild.getBoundingClientRect()

      let offset = cardsWidth - cardWidth

      if (width <= 768) {
        offset = cardsWidth - cardWidth - cardWidth + GAP_BETWEEN_CARDS - 30
      }

      if (width <= 460) {
        offset = cardsWidth - cardWidth + 10
      }

      if (width >= 1024) {
        offset = cardsWidth - cardWidth - cardWidth - GAP_BETWEEN_CARDS
      }

      setHorizontalOffset(offset)
    }
  }, [cardsRef, cardRefs, width])

  return (
    <>
      <AboutTeamContainer>
        <AboutRow header="The team">
          <TextContainer>
            <Text>
              One thing we’ve learned from our years within growing startups is
              that throwing more people at a problem rarely hastens solving it.
            </Text>
            <Text>
              We keep our team intentionally small, bringing on only those with
              the skills, experience and enthusiasm required to create real
              impact — both for our business, and for yours.
            </Text>
          </TextContainer>
        </AboutRow>
        <Sticky
          cover
          height="3000px"
          render={({ progress: prog }: StickyState) => {
            const cardAnimation = offset => ({
              transform: `translate3d(-${offset}px, 0 , 0) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`,
              transformStyle: 'preserve-3d',
              willChange: 'transform',
            })

            const scrollProgressAnimation = {
              transform: `translateX(${prog * 437}%)`,
            }

            return (
              <Section narrow>
                <Motion
                  defaultStyle={{ offset: 0 }}
                  style={{
                    offset: spring(prog * horizontalOffset, {
                      stiffness: 500,
                      damping: 20,
                    }),
                  }}
                >
                  {({ offset }) => (
                    <TeamCardsContainer style={cardAnimation(offset)}>
                      <Cards ref={cardsRef}>
                        {people.map((person, index) => {
                          const cardIsOpen =
                            isOpen && selectedPersonIndex === index

                          return (
                            <Card
                              key={person.name}
                              ref={cardRefs.current[index]}
                              onClick={() => handleModalToggle(true, index)}
                              isSelected={selectedPersonIndex === index}
                              isOpen={isOpen}
                            >
                              <IllustrationColored isOpen={cardIsOpen}>
                                <Image
                                  src={
                                    person.illustration.childImageSharp.fluid
                                  }
                                />
                              </IllustrationColored>
                              <Illustration isOpen={cardIsOpen}>
                                <Image
                                  src={
                                    person.illustration.childImageSharp.fluid
                                  }
                                />
                              </Illustration>
                              <div style={{ position: 'relative' }}>
                                <Name isOpen={cardIsOpen}>{person.name}</Name>
                                <Role isOpen={cardIsOpen}>{person.role}</Role>
                              </div>
                            </Card>
                          )
                        })}
                      </Cards>
                    </TeamCardsContainer>
                  )}
                </Motion>
                <Progress>
                  <Value style={scrollProgressAnimation} />
                </Progress>
              </Section>
            )
          }}
        />

        <AboutBackground />
      </AboutTeamContainer>

      {/* 
      
      The way the modal works for this is we have two parts.
      1. The Framer Motion animation that makes it look like the component is
          moving as a single piece
      2. The Modal content which is placed on top of the Framer Motion black modal
      
      */}
      <Portal>
        <AboutTeamModal isSelected={isOpen} handleRef={handleRef} />
        <AboutTeamModalContent
          isOpen={isOpen}
          people={people}
          person={person}
          handleOutsideClick={
            isOpen ? () => handleModalToggle(false) : () => {}
          }
          handleSetSelectedPersonIndex={handleSetSelectedPersonIndex}
        />
      </Portal>
    </>
  )
}

export function AboutRow({
  children,
  header,
}: {
  children: React.ReactNode
  header: string
}) {
  return (
    <AboutRowSpacer data-scroll-fade={true}>
      <Section narrow>
        <AboutRowContainer>
          <AboutRowHeader>{header}</AboutRowHeader>
          <AboutRowContent>{children}</AboutRowContent>
        </AboutRowContainer>
      </Section>
    </AboutRowSpacer>
  )
}

function AboutTeamModalContent({
  isOpen,
  people,
  person,
  handleOutsideClick,
  handleSetSelectedPersonIndex,
}: {
  isOpen: boolean
  people: Person[]
  person: Person
  handleOutsideClick: () => void
  handleSetSelectedPersonIndex: (index: number) => void
}) {
  const modalStyles = isOpen
    ? { opacity: 1, transition: `opacity 0s ease 0.4s` }
    : { opacity: 0, pointerEvents: 'none' }

  const activeIndex = people.findIndex(p => p.name === person.name)

  let nextIndex = activeIndex + 1
  if (activeIndex === people.length - 1) {
    nextIndex = 0
  }

  let prevIndex = activeIndex - 1
  if (activeIndex === 0) {
    prevIndex = people.length - 1
  }

  useEffect(() => {
    if (isOpen) {
      function handleKeyDown(event: KeyboardEvent) {
        switch (event.key) {
          case 'ArrowLeft':
            activeIndex === 0
              ? handleSetSelectedPersonIndex(people.length - 1)
              : handleSetSelectedPersonIndex(activeIndex - 1)
            break
          case 'ArrowRight':
            activeIndex === people.length - 1
              ? handleSetSelectedPersonIndex(0)
              : handleSetSelectedPersonIndex(activeIndex + 1)
            break
          default:
            return
        }
      }

      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, activeIndex])

  return (
    <Modal style={modalStyles}>
      <OutsideClickHandler onOutsideClick={handleOutsideClick}>
        <ModalContent>
          <CloseButton onClick={handleOutsideClick}>
            <ExIcon fill="#fff" />
          </CloseButton>
          {isOpen && (
            <ModalGrid key={person.name}>
              <ModalAbout>
                <ModalName>{person.name}</ModalName>
                <ModalRole>{person.role}</ModalRole>
                <div>
                  {person.about.map((text, index) => (
                    <ModalText key={text} index={index}>
                      {text}
                    </ModalText>
                  ))}
                </div>
                <SocialAnimator>
                  <SocialLinksDynamic links={person.social} />
                </SocialAnimator>
                <ModalSignature>
                  <SVG src={person.signature} />
                </ModalSignature>
              </ModalAbout>
              <MediaAnimator>
                <Image src={person.illustration.childImageSharp.fluid} />
              </MediaAnimator>
            </ModalGrid>
          )}
          <ModalPrev
            onClick={() => handleSetSelectedPersonIndex(prevIndex)}
            isOpen={isOpen}
          >
            <ChevronLeftIcon />
          </ModalPrev>
          <ModalNext
            onClick={() => handleSetSelectedPersonIndex(nextIndex)}
            isOpen={isOpen}
          >
            <ChevronRightIcon />
          </ModalNext>
        </ModalContent>
      </OutsideClickHandler>
    </Modal>
  )
}

export default AboutTeam

const fadeInAndUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
`

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const AboutTeamContainer = styled.div`
  padding: 0 0 240px;

  ${media.desktop`
    padding: 0 0 200px;
  `}

  ${media.tablet`
    padding: 0 0 160px;
  `}

  ${media.phablet`
    padding: 0 0 90px;
  `}
`

const AboutRowSpacer = styled.div`
  overflow: hidden;
`

const AboutRowContainer = styled.div`
  display: flex;

  ${media.desktop`
    flex-direction: column;
  `};
`

const AboutRowHeader = styled(Heading.h2)`
  align-self: flex-start;
  font-size: 3.2rem;
  color: ${p => p.theme.colors.grey};
  width: 20rem;
  min-width: 20rem;
  line-height: 1.4;
  padding-bottom: 1rem;
  margin-right: 6.3rem;

  ${media.desktop`
    flex-direction: column;
    margin: 0 0 3.5rem 0;
  `};

  ${media.tablet`
    padding-bottom: 0;
    margin-bottom: 1rem;
    width: 100%;
    font-size: 2.4rem;
  `};
`

const AboutRowContent = styled.div`
  flex: 1;
`

const TextContainer = styled.div`
  display: grid;
  grid-template-columns: 261px 361px;
  grid-column-gap: 57px;

  ${media.tablet`
    display: block;
    max-width: 355px;
  `}
`

const Text = styled.p`
  font-size: 22px;
  line-height: 28px;
  color: #fafafa;

  ${media.tablet`
    margin-bottom: 20px;
  `}

  ${media.phablet`
    font-size: 18px;
  `}
`

const TeamCardsContainer = styled.div`
  display: flex;
  color: ${p => p.theme.colors.grey};
  width: 20rem;
  min-width: 20rem;
  padding-bottom: 1rem;
  width: 100%;
  padding: 16vh 0 0 263px;
  align-items: center;
  transform-style: preserve-3d;

  ${media.desktop`
    padding: 16vh 0 0 0;
  `}
`

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 390px);
  grid-column-gap: 20px;

  ${media.phablet`
    grid-template-columns: repeat(5, 90vw);
    grid-column-gap: 10px;
  `}
`

const Illustration = styled.div<{ isOpen: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  opacity: ${p => (p.isOpen ? 0 : 1)};
  transition: opacity 0.4s;
  filter: grayscale(1);
`

const IllustrationColored = styled.div<{ isOpen: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  opacity: ${p => (p.isOpen ? 0 : 1)};
  transition: ${p => (p.isOpen ? 'opacity 0.4s 0.3s' : 'opacity 0.3s;')};
`

const Name = styled(Heading.h2)<{ isOpen: boolean }>`
  margin-bottom: 0;
  transform: translateY(${p => (p.isOpen ? 0 : -8)}px);
  opacity: ${p => (p.isOpen ? 0 : 1)};
  transition: transform 0.4s 0.5s, opacity 0.4s 0.5s;
`

const Role = styled.div<{ isOpen: boolean }>`
  color: ${p => p.theme.colors.grey};
  font-size: 22px;
  transform: translateY(${p => (p.isOpen ? 0 : -8)}px);
  opacity: ${p => (p.isOpen ? 0 : 1)};
  transition: transform 0.5s 0.475s, opacity 0.4s 0.475s, color 0.4s;
`

const Card = styled.div<{ isSelected: boolean; isOpen: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 470px;
  background: #000;
  box-shadow: 0px 24px 48px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  text-align: center;
  padding: 0 0 44px;
  cursor: pointer;
  will-change: filter;
  transition: filter 0.2s, opacity 0s;
  overflow: hidden;
  opacity: ${p => (p.isSelected && p.isOpen ? 0 : 1)};

  ${p => !p.isOpen && `transition-delay: 0.4s;`}

  &:hover ${Role} {
    color: ${p => p.theme.colors.gold};
  }

  &:hover ${Illustration} {
    opacity: 0;
  }

  ${media.tablet`
    height: 66vh;
    max-height: 550px;
    padding: 0 0 30px;
  `}

  ${media.phablet`
    height: 440px;
  `}

  ${media.phone_small`
    height: 380px;
  `}
`

const Progress = styled.div`
  margin: 40px 15px 180px 263px;
  position: relative;
  height: 1px;
  background: rgba(250, 250, 250, 0.15);
  overflow: hidden;

  ${media.desktop`
    margin: 40px 0 180px;
  `}

  ${media.tablet`
    margin: 40px 0 20vh;
  `}
`

const Value = styled.div`
  position: absolute;
  left: 0;
  width: 18.6%;
  height: 1px;
  background: ${p => p.theme.colors.sirius};
`

const CloseButton = styled.button`
  position: absolute;
  top: 30px;
  left: 30px;
  z-index: 1;

  ${media.phablet`
    position: absolute;
    top: 20px;
    left: 20px;

    &::before {
      content: '';
      position: absolute;
      left: -50%;
      top: -50%;
      width: 200%;
      height: 200%;
      background: rgba(0,0,0,0.33);
      border-radius: 50%;
      z-index: -1;
    }
  `}

  @media (max-height: 660px) {
    position: fixed;
    top: 46px;
    right: 36px;
    left: unset;
  }

  @media (max-height: 570px) {
    position: fixed;
    top: 46px;
    right: 36px;
    left: unset;
  }
`

const Modal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0 20px;

  & > div {
    flex: 1;
    max-width: 1140px;
    max-height: 630px;
    height: 100%;
  }

  ${media.phablet`
    padding: 30px 15px;
  `}
`

const ModalContent = styled.div`
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 630px;
  max-width: 1140px;
  height: 100%;
  width: 100%;
  background: #000;
  border-radius: 5px;
  box-shadow: 0px 24px 48px rgba(0, 0, 0, 0.2);

  ${media.tablet`
    overflow-y: scroll;
  `}
`

const ModalGrid = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ModalAbout = styled.div`
  width: 100%;
  max-width: 480px;
  margin: 40px 0 0 25px;

  ${media.desktop_small`
    max-width: initial;
    padding: 40px 80px;
    margin: 0 auto;
  `}
  
  ${media.tablet`
    padding: 30px;
  `}

  ${media.phablet`
    padding: 60px 20px 20px;
    pointer-events: none;
  `}

  @media (max-height: 660px) {
   padding-top: 24vh; 
  }

  @media (max-height: 570px) {
   padding-top: 50vh; 
  }
`

const ModalText = styled.p<{ index: number }>`
  color: #fff;
  margin-bottom: 25px;
  opacity: 0;
  animation: ${fadeInAndUp} 1.15s cubic-bezier(0.165, 0.84, 0.44, 1)
    ${p => p.index * 100 + 300}ms forwards;

  ${media.phablet`
    margin-bottom: 20px;
  `}
`

const ModalName = styled(Heading.h2)`
  margin-bottom: 5px;
  opacity: 0;
  animation: ${fadeInAndUp} 1.15s cubic-bezier(0.165, 0.84, 0.44, 1) 200ms
    forwards;
`

const ModalRole = styled.div`
  font-size: 22px;
  color: ${p => p.theme.colors.grey};
  margin-bottom: 30px;
  opacity: 0;
  animation: ${fadeInAndUp} 1.15s cubic-bezier(0.165, 0.84, 0.44, 1) 300ms
    forwards;

  ${media.phablet`
    margin-bottom: 20px;
  `}
`

const SocialAnimator = styled.div`
  margin-bottom: 25px;
  opacity: 0;
  animation: ${fadeInAndUp} 1.15s cubic-bezier(0.165, 0.84, 0.44, 1) 600ms
    forwards;
`

const ModalSignature = styled.div`
  opacity: 0;
  animation: ${fadeInAndUp} 1.15s cubic-bezier(0.165, 0.84, 0.44, 1) 700ms
    forwards;
`

const MediaAnimator = styled.div`
  width: 472px;
  margin-left: 35px;
  flex: 1;
  opacity: 0;
  animation: ${fadeIn} 1s cubic-bezier(0.165, 0.84, 0.44, 1) 300ms forwards;

  ${media.desktop_small`
    display: none;
  `}
`

const ModalNext = styled.button<{ isOpen: boolean }>`
  position: absolute;
  right: -20px;
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 50%;
  background: #fff;
  border-radius: 50%;
  opacity: ${p => (p.isOpen ? 1 : 0)};
  transform: translate(${p => (p.isOpen ? 0 : -8)}px, -50%);
  transition: all 0.4s ease 0.4s;

  svg {
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: translateX(2px);
  }

  &:hover svg {
    background: #fafafa;
  }

  opacity: 0;
  animation: ${fadeIn} 1s cubic-bezier(0.165, 0.84, 0.44, 1) 100ms forwards;

  ${media.desktop_medium`
    right: -10px;
  `}

  ${media.tablet`
    display: none;
  `}
`

const ModalPrev = styled.button<{ isOpen: boolean }>`
  position: absolute;
  left: -20px;
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 50%;
  background: #fff;
  border-radius: 50%;
  opacity: ${p => (p.isOpen ? 1 : 0)};
  transform: translate(${p => (p.isOpen ? 0 : 8)}px, -50%);
  transition: all 0.4s ease 0.4s;

  svg {
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: translateX(-2px);
  }

  &:hover svg {
    background: #fafafa;
  }

  opacity: 0;
  animation: ${fadeIn} 1s cubic-bezier(0.165, 0.84, 0.44, 1) 100ms forwards;

  ${media.desktop_medium`
    left: -10px;
  `}

  ${media.tablet`
    display: none;
  `}
`
