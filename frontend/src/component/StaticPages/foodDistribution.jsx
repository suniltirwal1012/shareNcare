import React from 'react'
import StepsCard from './StepsCard'

export default function FoodDistribution() {
    return (
        <div>
            <StepsCard number='3' title='Food Distribution' description='Providing Nourishment to Those in Need' image='https://images.unsplash.com/photo-1609139003551-ee40f5f73ec0?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' heading="Addressing food insecurity by distributing nutritious meals and groceries efficiently." desc="At Share and Care, we believe that access to nutritious food is a basic human right. Our food distribution service is committed to addressing food insecurity and hunger in our communities. Through strategic partnerships with food banks, shelters, and community organizations, we are able to efficiently distribute meals and groceries to those in need. Our team works tirelessly to source nutritious food items, pack them safely, and deliver them to individuals and families facing hunger. We understand the importance of providing not just any food, but quality, nutritious meals that nourish both body and soul. Whether it's a hot meal served at a local shelter or a bag of groceries delivered to a family's doorstep, every distribution effort is guided by our commitment to providing dignity, respect, and nourishment to those in need. Join us in the fight against hunger and help us build a world where everyone has access to the food they need to thrive." button="Register Now!" css="flex-row" bcolor="black" route="/register" />

        </div>
    )
}