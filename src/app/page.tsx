import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="">
      <header>
        <p>Rannie Raymundo</p>
        <nav>
          <Link href="#">About</Link>
          <Link href="#">Passion</Link>
          <Link href="#">Experience</Link>
          <Link href="#">Work</Link>
          <Link href="#">Contact</Link>
        </nav>
      </header>
      <section className="hero">
        <h1>Hi, I&apos;m Rannie Raymundo</h1>
        <p>Web Developer, & Front-End Developer</p>
      </section>
      <section className="info">
        <h2>a little bit about me</h2>
        <Image
          src="/assets/img/profile-dp.jpg"
          width="100"
          height="100"
          alt="Profile Picture"
        />
        <p>
          Hello, nice to meet you!, my name is Rannie and I&apos;m a web
          developer with good knowledge in Front-end and Back-end developement.
          My passion lies in web development, and I&apos;m enthusiastic about
          delving into new and innovative technologies in the field. My 4 years
          journey as a developer, I&apos;ve been exposed to talented teams and
          best IT methologies which delivers best e-commerce experience to the
          users.
        </p>
        <p>
          I enjoy engaging in games while enjoying my preferred iced coffee in
          the company of friends.
        </p>
      </section>
      {/* what I do */}
      <section className="todo">
        <h2>What I do???</h2>
        <div>
          <h3>Learn</h3>
          <p>
            Continuos Learning is the one of best way to improve myself.
            I&apos;m really love studying new
          </p>
        </div>
        <div>
          <h3>Developement</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et ea
            possimus earum consequatur optio, quam deleniti eos, iste adipisci
            itaque nobis fugit. Delectus iusto ipsum nulla possimus accusamus
            maiores aut!
          </p>
        </div>
        <div>
          <h3>Engagement</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et ea
            possimus earum consequatur optio, quam deleniti eos, iste adipisci
            itaque nobis fugit. Delectus iusto ipsum nulla possimus accusamus
            maiores aut!
          </p>
        </div>
      </section>
      <section>
        <h2>Skills</h2>
        <p>
          I&apos;ve been exposed to these awesome web technologies and I&apos;m
          eager to deep-dive it.
        </p>
        <div>
          <h3>SOME TECHNOLOGIES I&apos;VE WORKED WITH:</h3>
          <p>icons</p>
        </div>
        <div>
          <h3>happy to share where I&apos;ve worked</h3>
          <p>icons</p>
        </div>
      </section>
      <section>
        <h3>experience</h3>
      </section>
    </main>
  )
}
