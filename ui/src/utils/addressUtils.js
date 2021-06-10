export function getShortAddress(address) {
  const firstPart = address.slice(0, 5);
  const lastPart = address.slice(address.length-4, address.length);
  
  return firstPart + '...' + lastPart;
}