import { expect } from 'chai'
import particle from './particle'
import { update } from './particle'

describe('Particle Functionality', () => {

    it('should have default values', () => {
        const p = particle({})
        expect(p).to.be.ok
        expect(p.missingAttribute).to.not.be.ok
        // check position, velocity, acceleration, mass
        expect(p.position).to.have.lengthOf(2)
        expect(p.velocity).to.have.lengthOf(2)
        expect(p.acceleration).to.have.lengthOf(2)
        expect(p.mass).to.exist
    })

    it('should update the position by the velocity', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5] })
        const { position } = update(p, 1.0)
        expect(position[0]).to.be.closeTo(1.5, 0.001)
        expect(position[1]).to.be.closeTo(0.5, 0.001)
    })

    it('should update the position by the velocity and time delta', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5] })
        const { position } = update(p, 2.0) // dt is different here
        expect(position[0]).to.be.closeTo(2.0, 0.001)
        expect(position[1]).to.be.closeTo(0.0, 0.001)
    })

    it('should update the velocity by the acceleration', () => {
        const p = particle({ velocity: [1, 1], acceleration:[0.5, -0.5] })
        const { velocity } = update(p, 2.0)
        expect(velocity[0]).to.be.closeTo(2.0, 0.001)
        expect(velocity[1]).to.be.closeTo(0.0, 0.001)
    })

    it('particles should wrap around the world', () => {
        // create a particle with position outside
        // of the canvas area.  update() should
        // bring the particle back inside
        // check all four sides
        const canvas = {width: 800, height: 800}
        var positions = [[-10, -10], [10, -10], [810, 10], [810, 810]]
        positions.forEach(function(pos) {
        	const p = particle({ position: pos, velocity: [0.5, -0.5] })
        	var { position } = update(p, 1, canvas) // dt is different here
            expect(position[0]).to.be.within(0, 800)
            expect(position[1]).to.be.within(0, 800)
        })
    })

})