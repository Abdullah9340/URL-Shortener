export default function url(props) {
  return <div>Url does not exist</div>;
}

export async function getServerSideProps(context) {
  const req = context.req;
  const res = context.res;
  const { url } = context.params;
  const response = await fetch(
    `https://urlify-react-flask.herokuapp.com/?short=${url}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();
  if (data.error) {
    res.statusCode = 404;
    return { props: { error: data.error } };
  }

  return {
    redirect: {
      source: "/",
      permanent: false,
      basePath: false,
      destination: data.url,
    },
  };
}
