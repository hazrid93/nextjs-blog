export default function Dummy({ posts }) {
    return (
        <ul>
          <li>{posts.title}</li>
        </ul>
      )
}

// This function gets called at build time
export async function getStaticProps({params}) {
    // Call an external API endpoint to get posts
    const res = await fetch('https://api.sampleapis.com/coffee/hot')
    const posts = await res.json();
    const id = posts.findIndex(post => {
      if (post.id == params.id) {
        return true;
      }
    });
  
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
      props: {
        posts: posts[id],
      },
    }
  }

  // This function gets called at build time
export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const res = await fetch('https://api.sampleapis.com/coffee/hot')
    const posts = await res.json();

    // Get the paths we want to pre-render based on posts
    const paths = posts.map((post) => ({
      params: { id: post.id.toString() }
    }))
  
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
  }