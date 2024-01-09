'use client'

import 'react-vertical-timeline-component/style.min.css'
import Image from 'next/image'
import {
  IconContext,
  UsersThree,
  Lightbulb,
  Code,
  IconProps,
  FacebookLogo,
  InstagramLogo,
  GitlabLogo,
  GithubLogo,
  LinkedinLogo
} from '@phosphor-icons/react'
import { useMemo } from 'react'
import Cafe24 from '@/components/svg/Cafe24'
import dynamic from 'next/dynamic'
import Header from '@/components/Header/Header'

export default function Home() {
  const configIcons = useMemo(
    () =>
      ({
        weight: 'fill',
        color: '#09090b',
        size: 32
      }) as IconProps,
    []
  )

  /** Set serverside rendering to false */
  const Chrono = dynamic(() => import('../components/Chrono/Chrono'), {
    ssr: false
  })
  return (
    <>
      <Header />
      <main className="container">
        <section className="heroBanner">
          <div className="heroGreet">
            <h1>Hi!, I&apos;m Rannie Raymundo</h1>
            <p>Web Developer, & Front-End Developer</p>
          </div>
          <Image
            className="heroImg"
            src="/ran-cv/assets/img/no-bg-hero.png"
            width={1000}
            height={700}
            alt="programming work from home"
          />
        </section>

        <section id="info" className="info">
          <div className="profileWrap">
            <Image
              src="/ran-cv/assets/img/profile-dp.jpg"
              width="300"
              height="450"
              alt="Profile Picture"
              className="profileImg"
            />
          </div>
          <div className="aboutMe">
            <p className="introWrap">
              <span className="intro">Hello</span> nice to meet you!, my name is
              Rannie and I&apos;m a web developer with the good knowledge in the
              front-end and back-end developement. My passion lies in web
              development, and I&apos;m enthusiastic about delving into new and
              innovative technologies in the field. My 4 years journey as a
              developer, I&apos;ve been exposed to talented teams and best IT
              methologies which delivers best e-commerce experience to the
              users.
            </p>
            <p>
              I enjoy engaging in games while enjoying my preferred iced coffee
              in the company of friends.
            </p>
          </div>
        </section>
        {/* what I do */}
        <IconContext.Provider value={configIcons}>
          <section id="todo" className="todo">
            <h2>What I do?</h2>

            <div className="todoContainer">
              <div className="todoCard">
                <Lightbulb className="todoIcon" />
                <h3>Learn</h3>
                <p>
                  Continuous learning is the one of best way to improve myself.
                  I&apos;m love studying new web technologies so that I can keep
                  up with the latest trend development.
                </p>
              </div>
              <div className="todoCard">
                <Code className="todoIcon" />
                <h3>Developement</h3>
                <p>
                  I have experience with front and back end development, like
                  develop and integration of API. Documentation of technical
                  logs. I&apos;ve exposed on IT methologies like Agile.
                </p>
              </div>
              <div className="todoCard">
                <UsersThree className="todoIcon" />
                <h3>Engagement</h3>
                <p>
                  Collabarate with other productive teams like designer teams,
                  back-end services team, and higher position like Project
                  Manager, Team Leader etc. to deliver products to the most
                  efficient way.
                </p>
              </div>
            </div>
          </section>
          <section id="skills" className="skills">
            <h2>Skills</h2>
            <p>
              I&apos;ve been exposed to these awesome web technologies and
              I&apos;m eager to deep-dive it.
            </p>
            <div className="skillContainer">
              <div className="wrap">
                <h3>some technologies I&apos;ve worked with:</h3>
                <div className="skillMain">
                  <div className="skillList">
                    <h4>languages</h4>
                    <ul>
                      <li>JavaScript (ES6)</li>
                      <li>Typescript</li>
                      <li>CSS</li>
                      <li>HTML</li>
                      <li>Python</li>
                      <li>PHP</li>
                      <li>SQL</li>
                    </ul>
                  </div>
                  <div className="skillList">
                    <h4>Frameworks</h4>
                    <ul>
                      <li>Next.js</li>
                      <li>Nuxt.js</li>
                      <li>Node</li>
                      <li>Bootstrap</li>
                      <li>Laravel</li>
                      <li>Django Rest Framework</li>
                      <li>Tailwind</li>
                    </ul>
                  </div>
                  <div className="skillList">
                    <h4>Tools</h4>
                    <ul>
                      <li>Git & GitHub/GitLab</li>
                      <li>Chrome Devtools</li>
                      <li>Postman</li>
                      <li>Linux - Ubuntu</li>
                      <li>Docker</li>
                      <li>MongoDB</li>
                      <li>XAMPP</li>
                      <li>Jira</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="wrap">
                <h3>happy to share where I&apos;ve worked:</h3>
                <a
                  href="https://global.cafe24.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="cafe24 profile"
                  className="linkCompany"
                >
                  <Cafe24 className="cafe24Logo" />
                </a>
              </div>
            </div>
          </section>
          <section id="exp" className="exp">
            <h2>experience</h2>
            <Chrono
              items={[
                {
                  id: '0',
                  title: 'Feb - July 2019',
                  cardTitle: 'WEB DEVELOPER',
                  cardSubtitle: 'Cafe24 Philippines, Inc',
                  cardDetailedText:
                    "Applies and practices Agile Scrum methologies. Participate to a daily scrum ceremonies and a team discussion. Develop back-end services with Cafe24's APIs and integrate into front-end. Produce an output for e-commerce features."
                },
                {
                  id: '0',
                  title: 'July 2019 - December 2020',
                  cardTitle: 'JUNIOR WEB DEVELOPER',
                  cardSubtitle: 'Cafe24 Philippines, Inc',
                  cardDetailedText:
                    'Convert all wireframes into reusable components for the web pages. Documentation of technology exploration and outputs. Participates to scrum meetings and team collaborations.'
                },
                {
                  id: '0',
                  title: 'Feb - July 2019',
                  cardTitle: 'PROBATIONARY',
                  cardSubtitle: 'Cafe24 Philippines, Inc',
                  cardDetailedText:
                    "Familiarized with companies' IT methologies and technologies. Develop a probationary projects using a 3rd party APIs like GitLab, Jira, and Cafe24's API."
                }
              ]}
              mode="VERTICAL_ALTERNATING"
              disableNavOnKey
              noUniqueId
            />
          </section>

          <section className="project">
            <h2>Projects</h2>
            <div className="projectWrap">
              <div className="projectContent">
                <a
                  href="https://support.cafe24.com/hc/ko/articles/16925784462361?fbclid=IwAR0Dp7fArR-R4w0zYludyT5iCwvZBUdL_lStIjialX3SeurbuyxAQgSwLM"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="linkedin"
                  className="projectlink"
                >
                  Marketing Solution Platform MSP
                </a>
                <p>
                  Provides e-commerce service such as product and advertisement
                  management. All-in one account for easy ads management.
                  Provides e-commerce service such as product and advertisement
                  management. All-in one account for easy ads management.
                </p>
                <ul className="tech-list">
                  <li>TypeScript</li>
                  <li>JavaScript</li>
                  <li>Next.js</li>
                  <li>CSS</li>
                  <li>useSWR</li>
                </ul>
              </div>
              <div className="projectContent">
                <a
                  href="https://cmc.cafe24.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="iss"
                  className="projectlink"
                >
                  Integrated Support System (ISS)
                </a>
                <p>
                  Provides service for information about search correlation of
                  the products. Integration of Cafe24 API with Naver. Provides
                  service for information about search correlation of the
                  products. Integration of Cafe24 API with Naver.
                </p>
                <ul className="tech-list">
                  <li>Django Rest Framework</li>
                  <li>JavaScript</li>
                  <li>Nuxt.js</li>
                  <li>Boostrap Component</li>
                  <li>Vuex</li>
                </ul>
              </div>
              <div className="projectContent">
                <a
                  href="https://cmc.cafe24.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="iss"
                  className="projectlink"
                >
                  Cafe24 Marketing Center
                </a>
                <p>
                  Provide service for Global Marketing Solution like product
                  analysis, advertise using available feature platforms,
                  real-time advertising progress status, and progress and
                  performance monitoring system
                </p>
                <ul className="tech-list">
                  <li>Nuxt.js</li>
                  <li>JavaScript</li>
                </ul>
              </div>
              <div className="projectContent">
                <h4>
                  Automated Project Preparation
                  <span className="unavailable">unavailable</span>
                </h4>
                <p>
                  Provides a service for easy project management setup such as
                  automatic JIRA ticket and Gitlab Repository creation through
                  using JIRA&apos;s APIs and GitLab&apos;s APIs.
                </p>
                <ul className="tech-list">
                  <li>GitLab API</li>
                  <li>Jira API</li>
                  <li>Laravel</li>
                  <li>jQuery</li>
                  <li>CSS</li>
                  <li>HTML</li>
                  <li>Redis</li>
                  <li>MySql</li>
                </ul>
              </div>
            </div>
          </section>
          <section id="contact" className="getInTouch">
            <h2>Get In Touch</h2>
            <p>
              I&apos;m currently looking for any new opportunity, my inbox is
              always open for any related emails, I&apos;m looking forward to
              learn more!!
            </p>
            <a
              href="mailto:ranniemraymundo@gmail.com"
              target="_blank"
              rel="noreferrer"
              className="btn btnAnchor"
            >
              Let&apos;s Talk ☺️
            </a>
          </section>
        </IconContext.Provider>
      </main>
      <footer>
        <div>
          <p>Designed & Develop by</p>
          <p> Rannie Raymundo &copy;2023</p>
        </div>
        <div>
          Coded in
          <a
            href="http://https://code.visualstudio.com/"
            target="_blank"
            rel="noreferrer"
            className="footeLink"
          >
            Visual Studio Code
          </a>
          by yours truly. Built with
          <a
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noreferrer"
            className="footeLink"
          >
            Next.js
          </a>
          , deployed with
          <a
            href="https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site"
            target="_blank"
            rel="noreferrer"
            className="footeLink"
          >
            GitHub Pages
          </a>
          . All text is set in the Inter typeface.
        </div>
      </footer>
      <IconContext.Provider value={configIcons}>
        <aside className="socialLinks">
          <a
            id="linkedin"
            href="https://www.linkedin.com/in/ranniem/"
            target="_blank"
            rel="noreferrer"
            aria-label="linkedin"
          >
            <LinkedinLogo />
          </a>
          <a
            id="github"
            href="https://github.com/rranyz"
            target="_blank"
            rel="noreferrer"
            aria-label="github"
          >
            <GithubLogo />
          </a>
          <a
            id="gitlab"
            href="https://gitlab.com/rranyz"
            target="_blank"
            rel="noreferrer"
            aria-label="gitlab"
          >
            <GitlabLogo />
          </a>

          <a
            href="https://www.facebook.com/rranyz"
            target="_blank"
            rel="noreferrer"
            aria-label="facebook"
          >
            <FacebookLogo />
          </a>
          <a
            id="instagram"
            href="https://www.instagram.com/rranyz/"
            target="_blank"
            rel="noreferrer"
            aria-label="instagram"
          >
            <InstagramLogo />
          </a>
        </aside>
      </IconContext.Provider>
    </>
  )
}
