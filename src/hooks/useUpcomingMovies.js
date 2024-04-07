import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchUpcomingMovies=()=>{
    return api.get(`/movie/upcoming`)
}

export const useUpcomingMoviesQuery=()=>{
    return useQuery({
        queryKey:['movie-Upcoming'],
        queryFn:fetchUpcomingMovies,
        select:(results)=>results.data
    })
}
