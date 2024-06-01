import React from 'react'
import StepsCard from './StepsCard'

export default function DoorstepCollection() {
    return (
        <div>
            <StepsCard number='1' title='Doorstep Collection' description='Convenient Pickup Service for Your Donations

' image='https://img.freepik.com/premium-photo/welcome-team-shot-two-young-restaurant-owners-standing-outside-together-shaking-hands_590464-53704.jpg' heading="Experience hassle-free donation with our doorstep collection service. " desc="At Share and Care, we understand that your time is valuable. That's why we offer a convenient doorstep collection service for your donations. Whether you have clothing, household items, or non-perishable food items to donate, our team will come directly to your doorstep to pick them up. Simply schedule a pickup time that works for you, and we'll take care of the rest. Our goal is to make the donation process as seamless as possible, so you can feel good about giving back to your community without any added stress. With our doorstep collection service, making a difference has never been easier. Join us in spreading kindness and generosity today!" button="Donate Now!" css="flex-row" bcolor="black" route="/donate" />

        </div>
    )
}