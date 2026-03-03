export interface Generic<Type>{
list : Type[];
searchText: string;
keys : (keyof Type)[]
}
