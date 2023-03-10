import { useDispatch } from "react-redux";

import type { AppDispatch } from "../redux";

export const useAppDispatch: () => AppDispatch = useDispatch;
