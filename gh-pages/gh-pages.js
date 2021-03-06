/* global window */
import React from 'react'
import {render} from 'react-dom'
import uuid from 'uuid/v4'
import styled, {css} from 'styled-components'

import Deck, {Slide, Elements} from '@dekk/dekk'
import Fragment from '@dekk/fragment'
import Notes from '@dekk/speaker-notes'
import {FitImage} from '@dekk/image'
import Text, {Title, Subtitle} from '@dekk/text'
import {fadeSlide, fade, flip, cube} from '@dekk/animation'
import {
  Main,
  Cover,
  Chapter,
  Half,
  Grid,
  Collage,
  baseStyles
} from '@dekk/master-slides'

import redImage from './assets/red.jpg'
import greenImage from './assets/green.jpg'
import blueImage from './assets/blue.jpg'

import {red, green, blue, grey, black} from './design-system'

const pubnubCreds = {
  publishKey: 'pub-c-e516655b-9a34-4fd5-84b0-e722cfd38b9d',
  subscribeKey: 'sub-c-d4bd97fa-1d38-11e8-84be-f641dd32cbde'
}

const StyledHeader = styled.header`
  background: var(--header-background);
  color: var(--header-color);
  height: var(--header-height);
  display: flex;
  align-items: center;
  align-content: center;
  padding: 0 1rem;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  font-size: 1rem;
`

const Header = () => <StyledHeader>Dekk Tutorial</StyledHeader>

const StyledFooter = styled.footer`
  background: var(--footer-background);
  color: var(--footer-color);
  height: var(--footer-height);
  display: flex;
  align-items: center;
  align-content: center;
  padding: 0 1rem;
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  font-size: 1rem;
`

const Footer = () => <StyledFooter>Dekk Tutorial</StyledFooter>

const elements = (
  <Elements>
    <Header />
    <Footer />
  </Elements>
)

const baseMixin = css`
  ${baseStyles};
  --slide-background: ${black.main};
  --slide-color: white;
`

const deckMixin = css`
  ${baseMixin};
  --header-height: 3rem;
  --header-background: ${red.main};
  --header-color: white;
  --footer-height: 2rem;
  --footer-background: ${grey.main};
  --footer-color: black;
  padding: var(--header-height, 0) 0 var(--footer-height, 0);
`

/**
 * Cover slide
 */
const cover = (
  <Cover.Slide key={uuid()}>
    <Cover.A>
      <Title>Welcome to Dekk!</Title>
    </Cover.A>
    <Cover.B>
      <Subtitle>Presentations done right</Subtitle>
    </Cover.B>
    <Notes>
      <Text>
        Dekk is a presentation tool. It does things different but it does them
        right. Dekk is still a prerelease but we are happy to support you if you
        want to test and help develop Dekk.
      </Text>
    </Notes>
  </Cover.Slide>
)

/**
 * Thank you slide
 */
const thankYou = (
  <Cover.Slide key={uuid()} background={blue.main}>
    <Cover.A>
      <Title>Thank you!</Title>
    </Cover.A>
    <Cover.B>
      <Subtitle>
        <Fragment order={1} animation={fadeSlide.in.reverse}>
          very
        </Fragment>{' '}
        <Fragment order={2} animation={fadeSlide.in.down}>
          very
        </Fragment>{' '}
        <Fragment order={3} animation={fadeSlide.in.normal}>
          much
        </Fragment>
      </Subtitle>
    </Cover.B>
  </Cover.Slide>
)

/**
 * A title example
 */
const title = (
  <Main.Slide key={uuid()} background={red.main}>
    <Main.A>
      <Title>Presentations powered by React.js</Title>
      <Subtitle>styled-components</Subtitle>
      <Subtitle>react-motion</Subtitle>
      <Subtitle>mobX</Subtitle>
    </Main.A>
    <Notes>
      <Text>
        Dekk is powered by React.js and can therfore host any react component or
        even entire applications.
      </Text>
    </Notes>
  </Main.Slide>
)

const highlight = {}
highlight.red = css`
  ${({isActive}) => (isActive ? `color: ${red.main}` : '')};
`

highlight.green = css`
  ${({isActive}) => (isActive ? `color: ${green.main}` : '')};
`

highlight.blue = css`
  ${({isActive}) => (isActive ? `color: ${blue.main}` : '')};
`

highlight.bold = css`
  ${({isActive}) => (isActive ? 'font-weight: bolder' : '')};
`

highlight.underline = css`
  ${({isActive}) => (isActive ? 'text-decoration: underline' : '')};
`

/**
 * A fragment example
 */
const fragment = (
  <Collage.Slide key={uuid()}>
    <Collage.A>
      <Title>Fragments</Title>
      <Text>
        A slide can be divided into different{' '}
        <Fragment order={1} animation={highlight.red}>
          fragments
        </Fragment>. Fragments are sorted by{' '}
        <Fragment order={2} animation={highlight.underline}>
          order
        </Fragment>, which allows multiple fragments to appear at the{' '}
        <Fragment order={3} animation={highlight.green}>
          {(t, a) => `time: ${a ? t : '...'}`}
        </Fragment>.
      </Text>
    </Collage.A>
    <Collage.B>
      <Fragment order={1} fit animation={fadeSlide.in.reverse}>
        <FitImage
          src={redImage}
          alt="fragment 1, red image, a woman  with guitar"
        />
      </Fragment>
    </Collage.B>
    <Collage.C>
      <Fragment order={3} fit animation={fadeSlide.in.normal}>
        <FitImage
          src={greenImage}
          alt="fragment 2, green image, a man jumping up the stairs"
        />
      </Fragment>
    </Collage.C>
    <Notes>
      <Text>
        Dekk allows you to add page fragments. These tiny helpers are very
        useful and pretty flexible. Fragments are based on an order, which
        allows several fragments to get activated at the same time. You can
        choose from presets or write your own animations and/or transitions.
      </Text>
    </Notes>
  </Collage.Slide>
)

/**
 * An animation example
 */
const animation_1 = (
  <Chapter.Slide key={uuid()} animationOut={flip.x}>
    <Chapter.A>
      <Title>Animations</Title>
    </Chapter.A>
    <Chapter.B>
      <Subtitle>that shine</Subtitle>
    </Chapter.B>
    <Notes>
      <Text>Dekk allows you to add animations or transitions to slides.</Text>
    </Notes>
  </Chapter.Slide>
)

/**
 * An animation example
 */
const animation_2 = (
  <Chapter.Slide key={uuid()} animationIn={flip.x} animationOut={flip.y}>
    <Chapter.A>
      <Title>Different effects</Title>
    </Chapter.A>
    <Chapter.B>
      <Subtitle>on enter and leave</Subtitle>
    </Chapter.B>
    <Notes>
      <Text>Animations can be defined as in, out or both</Text>
    </Notes>
  </Chapter.Slide>
)

/**
 * An animation example
 */
const animation_3 = (
  <Chapter.Slide key={uuid()} animationIn={flip.y} animationOut={cube.slideX}>
    <Chapter.A>
      <Title>Flip, Cube, Slide, Fade</Title>
    </Chapter.A>
    <Chapter.B>
      <Subtitle>You can decide</Subtitle>
      <Subtitle>or write your own</Subtitle>
    </Chapter.B>
    <Notes>
      <Text>Dekk provides default animations.</Text>
    </Notes>
  </Chapter.Slide>
)

/**
 * An animation example
 */
const animation_4 = (
  <Chapter.Slide key={uuid()} animationIn={cube.slideX} animationOut={fade.in}>
    <Chapter.A>
      <Title>Transitions are just CSS</Title>
    </Chapter.A>
    <Chapter.B>
      <Subtitle>with some CSS variable magic</Subtitle>
    </Chapter.B>
    <Notes>
      <Text>Dekk uses CSS variables under the hood.</Text>
    </Notes>
  </Chapter.Slide>
)

/**
 * An animation example
 */
const animation_5 = (
  <Grid.Slide key={uuid()} animationIn={fade.in}>
    <Grid.A>
      <Fragment fit order={1} animation={fadeSlide.in.up}>
        <FitImage
          src={greenImage}
          alt="green image, a man jumping up the stairs"
        />
      </Fragment>
    </Grid.A>
    <Grid.B>
      <Subtitle>Master slides</Subtitle>
      <Text>Create masters and define a reusable layout and style</Text>
    </Grid.B>
    <Grid.C>
      <Subtitle>Shareable layouts</Subtitle>
      <Text>
        Share master slides in your team or even with the rest of the world.
      </Text>
    </Grid.C>
    <Grid.D>
      <FitImage
        src={blueImage}
        alt="blue image, a man sitting and ping pong balls falling down on him"
      />
    </Grid.D>
    <Notes>
      <Text>
        Master slides help share layouts and create consistent appearances.
      </Text>
    </Notes>
  </Grid.Slide>
)

/**
 * All slides besides cover and thankYou
 */
const content = [
  title,
  fragment,
  animation_1,
  animation_2,
  animation_3,
  animation_4,
  animation_5
]

/**
 * All slides
 */
const slides = [cover, ...content, thankYou]

/**
 * The app.
 */
const App = () => (
  <Deck mixin={deckMixin} timer={5} timerWarning={90}>
    {elements}
    {slides}
  </Deck>
)

// render the app based on the window.location.search
render(<App />, document.getElementById('mount-point'))
