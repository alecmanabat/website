import Link from 'next/link'

const linkStyle = {
  marginLeft: 15
}

const Index = () => (
  <div>
  <Link href="/lights">
    <a style={linkStyle}>Light Controls</a>
  </Link>
    <p>Hello</p>
    <img src="/test/bug.jpg" alt=">:[" height="100" width="100"/>
  </div>
)

export default Index
