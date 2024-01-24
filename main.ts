/* Copyright (c) 2020 MTHS All rights reserved
 *
 * Created by: will simard
 * Created on: Jan 2024
 * This program does the Iron man thing by setting up a proximity beacon and a gesture shake to act as the repulsor shooting
*/

// variables
let signal: number = 0
const rgbRing = neopixel.create(DigitalPin.P0, 8, NeoPixelMode.RGB)

// on start (from Micro:bit proximity beacon)
    radio.setGroup(11)
    radio.setTransmitPower(1)
    basic.forever(function () {
    radio.sendString('1')
    basic.pause(200)
})

// On shake flash rgbRing full brightness
input.onGesture(Gesture.Shake, function () {
    rgbRing.setBrightness(255)
    rgbRing.showColor(neopixel.rgb(0, 40, 255))
    basic.pause(500)
    rgbRing.showColor(neopixel.rgb(0, 0, 0))
})

// Check recieved signal strength and if signal strength is less than -60  flash rgbRing low brightness
    radio.onReceivedString(function (receivedString) {
    basic.clearScreen()
    signal = radio.receivedPacket(RadioPacketProperty.SignalStrength)
    if (signal <= -60) {
        rgbRing.setBrightness(50)
        rgbRing.showColor(neopixel.rgb(0, 20, 255))
    } else {
        rgbRing.showColor(neopixel.rgb(0, 0, 0))
    }
})