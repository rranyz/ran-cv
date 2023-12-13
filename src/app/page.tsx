'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  IconContext,
  UsersThree,
  Lightbulb,
  Code,
  Briefcase,
  IconProps,
  FacebookLogo,
  InstagramLogo,
  GitlabLogo,
  GithubLogo,
  LinkedinLogo
} from '@phosphor-icons/react'
import { useMemo } from 'react'
import Cafe24 from '@/components/svg/Cafe24'

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
  return (
    <>
      <header className="mainHeader">
        <p className="logo">Rannie</p>
        <nav className="navWrapper">
          <Link className="navLink" href="#">
            About
          </Link>
          <Link className="navLink" href="#">
            Passion
          </Link>
          <Link className="navLink" href="#">
            Experience
          </Link>
          <Link className="navLink" href="#">
            Work
          </Link>
          <Link className="navLink" href="#">
            Contact
          </Link>
        </nav>
      </header>
      <main className="container">
        <section className="heroBanner">
          <div className="heroGreet">
            <h1>Hi!, I&apos;m Rannie Raymundo</h1>
            <p>Web Developer, & Front-End Developer</p>
          </div>
          <Image
            className="heroImg"
            src="/assets/img/no-bg-hero.png"
            width={1000}
            height={700}
            alt="programming work from home"
          />
        </section>

        <section className="info">
          <div className="profilePicture">
            <Image
              src="/assets/img/profile-dp.jpg"
              width="300"
              height="450"
              alt="Profile Picture"
            />
          </div>
          <div className="aboutMe">
            <p>
              Hello, nice to meet you!, my name is Rannie and I&apos;m a web
              developer with good knowledge in Front-end and Back-end
              developement. My passion lies in web development, and I&apos;m
              enthusiastic about delving into new and innovative technologies in
              the field. My 4 years journey as a developer, I&apos;ve been
              exposed to talented teams and best IT methologies which delivers
              best e-commerce experience to the users.
            </p>
            <p>
              I enjoy engaging in games while enjoying my preferred iced coffee
              in the company of friends.
            </p>
          </div>
        </section>
        {/* what I do */}
        <IconContext.Provider value={configIcons}>
          <section className="todo">
            <h2>What I do?</h2>

            <div className="todoContainer">
              <div className="todoCard">
                <Lightbulb className="todoIcon" />
                <h3>Learn</h3>
                <p>
                  Continuos Learning is the one of best way to improve myself.
                  I&apos;m really love studying new
                </p>
              </div>
              <div className="todoCard">
                <Code className="todoIcon" />
                <h3>Developement</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Et ea
                  possimus earum consequatur optio, quam deleniti eos, iste
                  adipisci itaque nobis fugit. Delectus iusto ipsum nulla
                  possimus accusamus maiores aut!
                </p>
              </div>
              <div className="todoCard">
                <UsersThree className="todoIcon" />
                <h3>Engagement</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Et ea
                  possimus earum consequatur optio, quam deleniti eos, iste
                  adipisci itaque nobis fugit. Delectus iusto ipsum nulla
                  possimus accusamus maiores aut!
                </p>
              </div>
            </div>
          </section>
          <section className="skills">
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
                <Cafe24 className="cafe24Logo" />
              </div>
            </div>
          </section>
          <section className="exp">
            <h2>experience</h2>
            <div className="timeline">
              <div className="timelineBlock">
                <div className="timeContent">
                  <p className="timeTitle">Web Developer</p>
                  <p className="subTitle">Cafe24 Philippines, Inc</p>
                  <p>
                    Applies and practices Agile Scrum methologies. Participate
                    to a daily scrum ceremonies and a team discussion. Develop
                    back-end services with Cafe24&apos;s APIs and integrate into
                    front-end. Produce an output for e-commerce features.
                  </p>
                </div>
                <Briefcase className="timeContent timeIcon" />
                <p className="timeContent">December 2020 - June 2023</p>
              </div>
              <div className="timelineBlock">
                <p className="timeContent">July 2019 - December 2020</p>
                <Briefcase className="timeContent timeIcon" />
                <div className="timeContent">
                  <p className="timeTitle">Junior Web Developer</p>
                  <p className="subTitle">Cafe24 Philippines, Inc</p>
                  <p>
                    Convert all wireframes into reusable components for the web
                    pages. Documentation of technology exploration and outputs.
                    Participates to scrum meetings and team collaborations.
                  </p>
                </div>
              </div>
              <div className="timelineBlock">
                <div className="timeContent">
                  <p className="timeTitle">Probationary</p>
                  <p className="subTitle">Cafe24 Philippines, Inc</p>
                  <p>
                    Familiarized with companies&apos; IT methologies and
                    technologies. Develop a probationary projects using a 3rd
                    party APIs like GitLab, Jira, and Cafe24&apos;s API.
                  </p>
                </div>
                <Briefcase className="timeContent timeIcon" />
                <p className="timeContent">Feb - July 2019</p>
              </div>
            </div>
          </section>
        </IconContext.Provider>
        <section className="resume">
          <h3>View my full resume</h3>
          <button type="button">Download</button>
        </section>
        <section className="project">
          <h2>Projects</h2>
          <div className="projectWrap">
            <div className="projectContent">
              <h4>Marketing Solution Platform MSP</h4>
              <p>
                Provides e-commerce service such as product and advertisement
                management. All-in one account for easy ads management. Provides
                e-commerce service such as product and advertisement management.
                All-in one account for easy ads management.
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
              <h4>Integrated Support System (ISS) </h4>
              <p>
                Provides service for information about search correlation of the
                products. Integration of Cafe24 API with Naver. Provides service
                for information about search correlation of the products.
                Integration of Cafe24 API with Naver.
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
              <h4>Cafe24 Marketing Center</h4>
              <p>
                Provide service for Global Marketing Solution like product
                analysis, advertise using available feature platforms, real-time
                advertising progress status, and progress and performance
                monitoring system
              </p>
              <ul className="tech-list">
                <li>Nuxt.js</li>
                <li>JavaScript</li>
              </ul>
            </div>
            <div className="projectContent">
              <h4>Automated Project Preparation</h4>
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
        <section className="getInTouch">
          <h3>Get In Touch</h3>
          <p>
            I&apos;m currently looking for any new opportunity, my inbox is
            always open for any related emails, I&apos;m looking forward to
            learn more!!
          </p>
          <a
            href="mailto:ranniemraymundo@gmail.com"
            target="_blank"
            rel="noreferrer"
            className="btnAnchor"
          >
            Let&apos;s Talk ☺️
          </a>
        </section>
      </main>
      <footer>
        <p>Designed & Develop by</p>
        <p> Rannie Raymundo 2023</p>
      </footer>
      <IconContext.Provider value={configIcons}>
        <aside className="socialLinks">
          <a
            id="linkedin"
            href="http://google.com"
            target="_blank"
            rel="noreferrer"
            aria-label="linkedin"
          >
            <LinkedinLogo />
          </a>
          <a
            id="github"
            href="http://google.com"
            target="_blank"
            rel="noreferrer"
            aria-label="github"
          >
            <GithubLogo />
          </a>
          <a
            id="gitlab"
            href="http://google.com"
            target="_blank"
            rel="noreferrer"
            aria-label="gitlab"
          >
            <GitlabLogo />
          </a>

          <a
            href="http://google.com"
            target="_blank"
            rel="noreferrer"
            aria-label="facebook"
          >
            <FacebookLogo />
          </a>
          <a
            id="instagram"
            href="http://google.com"
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
