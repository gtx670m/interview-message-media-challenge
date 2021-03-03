import { configureStore } from '@reduxjs/toolkit';
import galleryReducer from '../components/Gallery/gallerySlice';

export default configureStore({
  reducer: {
    gallery: galleryReducer,
  },
});
