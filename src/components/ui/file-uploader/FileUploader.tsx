import { useRef, useState, HTMLAttributes, FC, ChangeEvent } from 'react';
import Button from '../button/Button';
import styles from './FileUploader.module.scss';

interface FileUploaderProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  icon: string;
  accept?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const FileUploader: FC<FileUploaderProps> = ({
  icon,
  onChange,
  accept,
  ...props
}) => {
  const [fileName, setFileName] = useState('Выберите файл');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setFileName(event.target.files[0].name);
    onChange(event);
    event.target.value = '';
  };

  return (
    <div {...props}>
      <Button
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
        onClick={handleClick}
      >
        <img className={styles.file_uploader_img} src={icon} alt="" />
        <span className={styles.file_uploader_text}>{fileName}</span>
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={onChangeHandler}
        accept={accept}
      />
    </div>
  );
};

export default FileUploader;
