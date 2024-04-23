import { Edge, Node } from "reactflow";

export const initialEdges = JSON.parse(localStorage.getItem("edges")) || [];

export const initialNodes = JSON.parse(localStorage.getItem("nodes")) || [];
