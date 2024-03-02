import { PhotoType } from './type/commonType';
import './css/ImageList.css';

function ImageList({ images }: { images: PhotoType[] }) {
    return (
        <div className="image-grid">
            {images.map((item: PhotoType) => (
                <img
                    key={item.id}
                    src={item.thumbnailUrl}
                    alt={`Thumbnail ${item.id}`}
                    style = {{ "width": "100px" }} 
                />
            ))}
        </div>
    );
}

export default ImageList;
