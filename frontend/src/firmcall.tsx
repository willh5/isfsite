
// @ts-nocheck

import { useQuery } from '@tanstack/react-query';
import axios from 'axios'

//type Firm = {
//name: string
//hq_location: string


//}

//async function fetchFirms() {
  //const { data } = await axios.get<any[]>("willh1.pythonanywhere.com/api/firms");



async function fetchFirms() {
  const { data } = await axios.get<Firm[]>("https://jsonplaceholder.typicode.com/comments?_limit=10");



  return data;
}

export function useFirms() {
  return useQuery(['firms'], () => fetchFirms());
}