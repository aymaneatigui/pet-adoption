const fetchPet = async ({ queryKey }) => {
  const id = queryKey[1]
  console.log(id)
  const res = await fetch(`https://pets-v2.dev-apis.com/pets?id=${id}`)

  if(!res.ok){
    throw new Error(`details/${id} fetch not ok`)
  }

  return res.json()
};

export default fetchPet
