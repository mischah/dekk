import React, {Children, cloneElement} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Master from './master'
import {Slot} from './components'

/**
 * This is a helper function to create master slides.
 * A master slide is a slide with predefined slots.
 *
 * To create a master a wrapping component is used. While it does not
 * matter what this component is, Dekk already provides this for you.
 * Simply use `Master` from `./components`.
 *
 * The children are then parsed and cheked to ensure the slides have
 * the correct content. These checks are very simple and only define
 * which children should be used.
 * To ensure further safety you can define PropTypes or other mechanisms
 * to ensure the intended usage of your master slides.
 *
 * This function returns a smart React Component which has all allowed
 * slots as statics.
 * @public
 * @param {ReactComponent} master
 *   A wrapping component (could even be just a `<div>`)
 * @return {MasterSlide}
 * @example
 * import React from 'react'
 * import createmaster, {Master, Slot} from '@dekk/master'
 * import {Title, Subtitle} from './components/headlines/'
 *
 * const CoverSlide = createMaster(
 *   <Master>
 *     <Slot name="Top"
 *           only={[Title]}/>
 *     <Slot name="Bottom"
 *           only={[Subtitle]}/>
 *   </Master>
 * )
 *
 * @example
 * import React from 'react'
 * import createmaster, {Master, Slot} from '@dekk/master'
 * import Image from '@dekk/Image'
 *
 * const ImageAndText = createMaster(
 *   <Master>
 *     <Slot name="Left"
 *           not={[Image]}/>
 *     <Slot name="Right"
 *           only={[Image]}/>
 *   </Master>
 * )
 */
export default function createMaster(master) {
  const {children} = master.props

  /**
   * @public
   * @type {MasterSlide}
   */
  const Slide = props => {
    return (
      <Master {...props} content={props.children}>
        {Children.toArray(children).map((child, i) => {
          if (child.type === Slot) {
            return cloneElement(child, {
              key: `master-slot__${i}`,
              component: Slide[child.props.name]
            })
          }
          return child
        })}
      </Master>
    )
  }

  // Filter all non `Slot` Components (`<Static/>` is removed)
  // then set them as statics on `Slide`
  // Each slot creates an empty unique function which is used to
  // validate the content.
  Children.toArray(children)
    .filter(child => child.type === Slot)
    .forEach(slot => {
      const {name} = slot.props
      Slide[name] = () => null
    })

  /**
   * Allowed propTypes for `<Slide/>`
   * @private
   * @property {ReactElement} children
   */
  Slide.propTypes = {
    children: PropTypes.node.isRequired
  }

  return Slide
}

/**
 * A wrapper around createMaster.
 *
 * This helper allows creating a styled Master Component.
 * @param {MasterTemplate} template
 *   A typical template as used in createMaster
 * @returns {StyledLayout}
 * @example
 * const Layout = createStyledMaster(
 *   <Master>
 *     <Slot name="A"/>
 *     <Slot name="B"/>
 *   </Master>
 * )`
 *   display: grid;
 *   grid-template-areas: "A" "B";
 *   grid-template-rows: 1fr 1fr;
 *   grid-template-columns: 1fr;
 *   [data-slot="A"] {
 *     grid-area: A;
 *   }
 *   [data-slot="B"] {
 *     grid-area: B;
 *   }
 * `
 */
export const createStyledMaster = template => {
  const Layout = createMaster(template)
  return (...args) => {
    Layout.Slide = styled(Layout)(...args)
    return Layout
  }
}

/**
 * This Component will be returned by `createMaster`.
 * It has a static method for each slot that has been added.
 * @public
 * @typedef MasterSlide
 * @type {ReactComponent}
 * @param {Object} props
 * @param {Object} props.mixin
 *   A mixin that is added to the style block
 */

/**
 * A template to create master slides
 * @public
 * @typedef MasterTemplate
 * @type {ReactComponent}
 * @param {Object} props
 * @param {(Slot|(Slot[]|Static|Static[])} props.children
 *   The Template only allows slots and static slots
 */

/**
 * A styled layout component
 * @public
 * @typedef StyledLayout
 * @type {Function}
 * @param {...Array} args
 *   The `input` of styled.literal...
 * @return {Layout}
 */

/**
 * A complete layout
 * @public
 * @typedef Layout
 * @type {ReactComponent}
 * @return {{Slide: ReactComponent, Slot: ReactComponent}}
 */
