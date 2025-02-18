
const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const abbrAddr = (addr: string) => `${addr.slice(0, 3)}...${addr.slice(addr.length - 4, addr.length - 1)}`

export {
  sleep,
  abbrAddr
}