import React, { useLayoutEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import shapes from './Shapes'
import mediaqueries from '@styles/media'

const minWidth: number = 0
const minHeight: number = 0

// Thresholds
const MARGINS: number = 4
const round = num => Math.round(num)

// End of what's configurable.
let clicked: {} | null = null

let onRightEdge: boolean
let onBottomEdge: boolean
let onLeftEdge: boolean
let onTopEdge: boolean

let rightScreenEdge: number
let bottomScreenEdge: number

let b: number
let x: number
let y: number

let redraw: boolean = false

let pressedKeys: {} = {}

function ShapeShifter() {
  const [activeShape, setActiveShape] = useState(0)
  const [animate, setAnimate] = useState(false)

  const Active = shapes[activeShape]
  const activeStyles = {
    width: Active.width,
    height: Active.height,
  }
  const resetActiveStyles = JSON.stringify({
    ...activeStyles,
    maxHeight: Active.maxHeight,
  })

  const shape = useRef()
  const shapeMirror = useRef()

  const rel = useRef()
  const relMirror = useRef()

  const numbers = useRef()
  const glow = useRef()

  useLayoutEffect(() => {
    setAnimate(true)
    const $shape = shape.current

    $shape.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)

    // Alt and Shift
    document.addEventListener('keydown', onKeydown)
    document.addEventListener('keyup', onKeyup)

    // Touch events
    $shape.addEventListener('touchstart', onTouchDown)
    document.addEventListener('touchmove', onTouchMove)
    document.addEventListener('touchend', onTouchEnd)

    // Remove all the events when unselected
    return () => {
      $shape.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)

      // Alt and Shift
      document.removeEventListener('keydown', onKeydown)
      document.removeEventListener('keyup', onKeyup)

      // Touch events
      $shape.removeEventListener('touchstart', onTouchDown)
      document.removeEventListener('touchmove', onTouchMove)
      document.removeEventListener('touchend', onTouchEnd)
    }
  }, [])

  function onKeydown(event) {
    pressedKeys[event.key] = event.key
    redraw = true
  }

  function onKeyup(event) {
    delete pressedKeys[event.key]
    redraw = true
  }

  function onMouseDown(event) {
    onDown(event)
    event.preventDefault()
  }

  function onMove(e) {
    updateGlobalSettings(e)
    event = e
    redraw = true
  }

  function onTouchDown(event) {
    onDown(event.touches[0])
    event.preventDefault()
  }

  function onTouchMove(event) {
    onMove(event.touches[0])
  }

  function onTouchEnd(event) {
    if (event.touches.length == 0) onUp(event.changedTouches[0])
  }

  function onDown(event) {
    updateGlobalSettings(event)
    shape.current.style.transition = 'unset'
    shapeMirror.current.style.transition = 'unset'
    glow.current.style.opacity = 0

    let isResizing = onRightEdge || onBottomEdge || onTopEdge || onLeftEdge

    clicked = {
      cx: event.clientX,
      cy: event.clientY,
      w: b.width,
      h: b.height,
      isResizing,
      onTopEdge,
      onLeftEdge,
      onRightEdge,
      onBottomEdge,
    }
  }

  function onUp(event) {
    updateGlobalSettings(event)
    resetStyles(shape.current)
    resetStyles(shapeMirror.current, 'mirror')

    clicked = null
  }

  function updateGlobalSettings(event) {
    b = shape.current.getBoundingClientRect()
    x = event.clientX - b.left
    y = event.clientY - b.top

    onTopEdge = y < MARGINS
    onLeftEdge = x < MARGINS
    onRightEdge = x >= b.width - MARGINS
    onBottomEdge = y >= b.height - MARGINS

    rightScreenEdge = window.innerWidth - MARGINS
    bottomScreenEdge = window.innerHeight - MARGINS
  }

  function resetStyles($el, mirror) {
    const reset = JSON.parse($el.getAttribute('data-reset'))
    const corners = document.querySelectorAll('[data-corner]')
    corners.forEach(corner => (corner.style.borderColor = '#6166dc'))

    $el.style.transform = ''
    $el.style.transition = `
      width 0.3s cubic-bezier(0.215, 0.61, 0.355, 1),
      height 0.3s cubic-bezier(0.215, 0.61, 0.355, 1),
      transform 0.3s ease
    `
    $el.style.width = `${reset.width}px`
    $el.style.height = `${reset.height}px`
    $el.style.top = `unset`
    $el.style.right = `unset`
    $el.style.bottom = `unset`
    $el.style.left = `unset`

    if (!mirror) {
      $el.style.borderColor = '#6166dc'
    }

    numbers.current.style.opacity = 0
    numbers.current.style.color = '#6166dc'
    glow.current.style.opacity = 1
    glow.current.style.transition = 'opacity 1.6s linear'
  }

  function handleActiveShapeClick() {
    shape.current.style.transition = ''
    shapeMirror.current.style.transition = ''

    if (activeShape === shapes.length - 1) {
      setActiveShape(0)
    } else {
      setActiveShape(curr => curr + 1)
    }
  }

  function addWidthAndHeightUnits() {
    numbers.current.innerHTML = `${round(b.width)} x ${round(b.height)}`
    numbers.current.style.opacity = 1
  }

  function handleAlt($el, $rel) {
    if (pressedKeys.Alt) {
      $el.style.top = ''
      $el.style.right = ''
      $el.style.bottom = ''
      $el.style.left = ''
      $rel.style.display = 'flex'
      $rel.style.alignItems = 'center'
      $rel.style.justifyContent = 'center'
    } else {
      $rel.style.display = ''
      $rel.style.alignItems = ''
      $rel.style.justifyContent = ''
    }
  }

  function handleShift($el, len) {
    const maxHeight = JSON.parse($el.getAttribute('data-reset')).maxHeight
    const limitedLength = pressedKeys.Alt && len > maxHeight ? maxHeight : len

    if (pressedKeys.Shift) {
      $el.style.width = `${limitedLength}px`
      $el.style.height = `${limitedLength}px`
    }
  }

  function handleLeft($el, len) {
    if (len > minWidth && !pressedKeys.Shift) {
      $el.style.width = `${len}px`
      $el.style.transform = `scaleX(1)`
      numbers.current.style.transform = `scaleX(1)`
      $el.style.right = 0
      $el.style.left = ''
    } else {
      $el.style.width = `${Math.abs(len)}px`
      $el.style.transform = `scaleX(-1)`
      numbers.current.style.transform = `scaleX(-1)`
      $el.style.left = '100%'
      $el.style.right = ''
    }
  }

  function handleRight($el, len) {
    if (len > minWidth && !pressedKeys.Shift) {
      $el.style.width = `${len}px`
      $el.style.transform = `scaleX(1)`
      numbers.current.style.transform = `scaleX(1)`
      $el.style.left = 0
      $el.style.right = ''
    } else {
      $el.style.width = `${Math.abs(len)}px`
      $el.style.transform = `scaleX(-1)`
      numbers.current.style.transform = `scaleX(-1)`
      $el.style.right = '100%'
      $el.style.left = ''
    }
  }

  function handleTop($el, len, mirror) {
    const maxHeight = JSON.parse($el.getAttribute('data-reset')).maxHeight
    const lengthLimited = pressedKeys.Alt && len > maxHeight ? maxHeight : len

    if (len > minHeight) {
      $el.style.height = `${lengthLimited}px`
    }

    if (mirror) {
      $el.style.top = 0
      $el.style.bottom = ''
    } else {
      $el.style.bottom = 0
      $el.style.top = ''
    }
  }

  function handleBottom($el, len, mirror) {
    if (len > minHeight && !pressedKeys.Shift) {
      $el.style.height = `${len}px`
      $el.style.transform = `scaleY(1)`
      numbers.current.style.transform = `scaleY(1)`
      $el.style.top = 0
    } else {
      if (!mirror) {
        $el.style.height = `${Math.abs(len)}px`
        $el.style.transform = `scaleY(-1)`
        numbers.current.style.transform = `scaleY(-1)`
        $el.style.bottom = '100%'
        $el.style.top = 'unset'
      }
    }
  }

  ;(function animate() {
    if (typeof window === 'undefined') return
    requestAnimationFrame(animate)

    if (!redraw) return

    const $shape = shape.current
    const $rel = rel.current

    const $shapeMirror = shapeMirror.current
    const $relMirror = relMirror.current

    const corners = document.querySelectorAll('[data-corner]')

    redraw = false

    if (clicked && clicked.isResizing) {
      if (clicked.onRightEdge) {
        let currentWidth = event.clientX - clicked.cx + clicked.w

        handleRight($shape, currentWidth)
        handleRight($shapeMirror, currentWidth, 'mirror')
        handleShift($shape, currentWidth)
        handleShift($shapeMirror, currentWidth)
      }

      if (clicked.onBottomEdge) {
        const maxHeight = JSON.parse($shape.getAttribute('data-reset'))
          .maxHeight

        let currentHeight = clicked.h + event.clientY - clicked.cy

        if (Math.max(y, minHeight) > maxHeight) {
          currentHeight = maxHeight
          $shape.style.borderColor = '#FF5E5E'
          corners.forEach(corner => (corner.style.borderColor = '#FF5E5E'))
          numbers.current.style.color = '#FF5E5E'
        } else {
          $shape.style.borderColor = '#6166dc'
          numbers.current.style.color = '#6166dc'
          corners.forEach(corner => (corner.style.borderColor = '#6166dc'))
        }

        handleBottom($shape, currentHeight)
        handleBottom($shapeMirror, currentHeight, 'mirror')
        handleShift($shape, currentHeight)
        handleShift($shapeMirror, currentHeight)
      }

      if (clicked.onLeftEdge) {
        const currentWidth = clicked.cx - event.clientX + clicked.w

        handleLeft($shape, currentWidth)
        handleLeft($shapeMirror, currentWidth, 'mirror')
        handleShift($shape, currentWidth)
        handleShift($shapeMirror, currentWidth)
      }

      if (clicked.onTopEdge) {
        let currentHeight = Math.max(
          clicked.cy - event.clientY + clicked.h,
          minHeight
        )

        if (currentHeight <= 0) {
          $shape.style.borderColor = '#FF5E5E'
          corners.forEach(corner => (corner.style.borderColor = '#FF5E5E'))
          numbers.current.style.color = '#FF5E5E'
        } else {
          $shape.style.borderColor = '#6166dc'
          numbers.current.style.color = '#6166dc'
          corners.forEach(corner => (corner.style.borderColor = '#6166dc'))
        }

        handleTop($shape, currentHeight)
        handleTop($shapeMirror, currentHeight, 'mirror')
        handleShift($shape, currentHeight)
        handleShift($shapeMirror, currentHeight)
      }

      addWidthAndHeightUnits()
      handleAlt($shape, $rel)
      handleAlt($shapeMirror, $relMirror)
    }

    // This code executes when mouse moves without clicking
    // style cursor
    if ((onRightEdge && onBottomEdge) || (onLeftEdge && onTopEdge)) {
      $shape.style.cursor = 'nwse-resize'
    } else if ((onRightEdge && onTopEdge) || (onBottomEdge && onLeftEdge)) {
      $shape.style.cursor = 'nesw-resize'
    } else if (onRightEdge || onLeftEdge) {
      $shape.style.cursor = 'ew-resize'
    } else if (onBottomEdge || onTopEdge) {
      $shape.style.cursor = 'ns-resize'
    } else {
      $shape.style.cursor = 'default'
    }
  })()

  return (
    <Frame>
      <ShapesContainer>
        <Relative ref={rel} style={activeStyles}>
          <ShapeContainer
            style={activeStyles}
            ref={shape}
            data-reset={resetActiveStyles}
            animate={animate}
          >
            <Active.Shape />
            <ShapeGlow ref={glow} />
            <Numbers ref={numbers} />
            <HandleShapeShift onClick={handleActiveShapeClick} />
            <Corners animate={animate}>
              <TopLeftCorner data-corner="top-left" />
              <TopRightCorner data-corner="top-right" />
              <BottomLeftCorner data-corner="bottom-left" />
              <BottomRightCorner data-corner="bottom-right" />
            </Corners>
          </ShapeContainer>
        </Relative>
        <Mirror>
          <Relative ref={relMirror} style={activeStyles} mirror>
            <ShapeContainer
              style={activeStyles}
              data-reset={resetActiveStyles}
              ref={shapeMirror}
              animate={animate}
              mirror
            >
              <Blur>
                <Active.Mirror />
              </Blur>
            </ShapeContainer>
          </Relative>
        </Mirror>
      </ShapesContainer>
    </Frame>
  )
}

export default ShapeShifter

const Frame = styled.div`
  position: relative;
  width: 45%;
  display: flex;
  justify-items: center;
  height: 100%;
  justify-content: center;
  align-items: center;
  align-self: flex-start;
  flex-direction: column;

  ${mediaqueries.desktop`
    display: none;
  `}
`

const ShapesContainer = styled.div`
  position: absolute;
  top: calc(50% - 195px);
  right: 80px;
`

const Mirror = styled.div`
  position: absolute;
  top: 100%;
  z-index: 0;

  &::after {
    content: '';
    position: absolute;
    left: -100vw;
    top: 0%;
    width: 300vw;
    height: 800px;
    background: linear-gradient(
      rgba(17, 16, 20, 0.8),
      rgba(17, 16, 20, 1) 20%,
      #101216 100%
    );
  }
`

const Blur = styled.div`
  filter: blur(6px);
  width: 100%;
  height: 100%;
`

const HandleShapeShift = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  width: calc(100% - 1px);
  height: calc(100% - 1px);
  z-index: 2;
  cursor: pointer;
`

const Relative = styled.div`
  position: relative;

  ${p =>
    p.mirror &&
    `
    position: relative;
    top: 35px;
    z-index: 0;
    pointer-events: none;
  `}
`

const ShapeContainer = styled.div`
  position: absolute;
  cursor: pointer;
  will-change: width, height, transform;
  border: 1px solid transparent;
  border-color: ${p => (p.animate ? '#6166dc' : 'transparent')};
  opacity: ${p => (p.animate ? 1 : 0)};
  z-index: 1;
  transition: opacity 1.4s ease 0.3s, border-color 3s 1.3s linear;

  &::after {
    content: '';
    position: absolute;
    left: -3px;
    top: -3px;
    height: calc(100% + 6px);
    width: calc(100% + 6px);
    z-index: 1;
  }

  ${p =>
    !p.mirror &&
    `
    svg {
      position: absolute;
      top: 0;
      left: 0;
    }
  `}

  ${p =>
    p.mirror &&
    `
    z-index: 0;
    border: 1px solid transparent;
  `}
`

const ShapeGlow = styled.div`
  transition: opacity 0.3s ease;
  will-change: opacity;
  pointer-events: none;

  &::after {
    content: '';
    position: absolute;
    width: 130%;
    height: 130%;
    top: -15%;
    left: -15%;
    z-index: 2;
    background: rgba(102, 116, 141, 0.1);
    filter: blur(150px);
  }
`

const Corners = styled.div`
  opacity: ${p => (p.animate ? 1 : 0)};
  transition: opacity 3s 1.3s;
`

const Corner = styled.div`
  height: 7px;
  width: 7px;
  background: #111216;
  border: 1px solid #6166dc;
  position: absolute;
`

const TopLeftCorner = styled(Corner)`
  top: -3px;
  left: -3px;
`

const TopRightCorner = styled(Corner)`
  top: -3px;
  right: -3px;
`

const BottomLeftCorner = styled(Corner)`
  bottom: -3px;
  left: -3px;
`

const BottomRightCorner = styled(Corner)`
  bottom: -3px;
  right: -3px;
`

const Numbers = styled.div`
  position: absolute;
  bottom: -24px;
  min-width: 50px;
  left: 0;
  right: 0;
  margin: 0 auto;
  text-align: center;
  font-size: 12px;
  color: #6166dc;
  transition: opacity 0.1s linear;
  pointer-events: none;
`