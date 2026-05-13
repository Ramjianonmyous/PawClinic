import Hero from './Hero'
import Partners from './Partners'
import About from './About'
import Services from './Services'
import WhyChooseUs from './WhyChooseUs'
import Team from './Team'
import Testimonials from './Testimonials'
import Contact from './Contact'
import AIFeatures from './AIFeatures'


export default function Home({ token, addToast, handleContact, onOpenAIFeatures }) {
  return (
    <>
      <Hero />
      <Partners />
      <About />
      <Services />
      {token && <AIFeatures token={token} addToast={addToast} onFeatureClick={onOpenAIFeatures} />}
      <WhyChooseUs />
      <Team />
      <Testimonials />
      <Contact onContactSubmit={handleContact} />
    </>
  )
}
