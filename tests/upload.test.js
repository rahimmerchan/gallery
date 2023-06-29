import { render, fireEvent } from '@testing-library/react';
import Upload from '../src/MainMenu/components/Upload';

describe('UploadComponent', () => {
  it('should trigger the upload function when the button is clicked', () => {
    // Render the UploadComponent
    const { getByTestId } = render(<Upload />);
    
    // Simulate a file upload event
    const file = new File(['test file'], 'test.png', { type: 'image/png' });
    const inputNode = getByTestId('input');
    fireEvent.change(inputNode, { target: { files: [file] } });
    
    // Simulate a button click event
    const buttonNode = getByTestId('uploadButton');
    fireEvent.click(buttonNode);
    
    // Assert that the upload function has been called
    // You can mock the upload function to check if it has been called with the correct parameters
    expect(mockUploadFunction).toHaveBeenCalledWith(file);
  });
});