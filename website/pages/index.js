import Link from 'next/link'

const linkStyle = {
  marginLeft: 15
}

const Index = () => (
  <div>
  <Link href="/lights">
    <a style={linkStyle}>Light Controls</a>
  </Link>
    <p>Hello Next.js</p>
  </div>
)

export default Index
