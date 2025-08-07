'use client';

import { useState, useRef, useEffect } from 'react';
import { useChat, Message, GeneratedPost } from '../contexts/ChatContext';
import { useRouter } from 'next/navigation';

const ChatMessage = ({ message }: { message: Message }) => {
  return (
    <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div
        className={`px-4 py-2 rounded-lg max-w-[80%] ${
          message.isUser
            ? 'bg-blue-600 text-white rounded-tr-none'
            : 'bg-gray-200 text-gray-800 rounded-tl-none'
        }`}
      >
        {message.content}
        
        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-2">
            {message.attachments.map(attachment => (
              <div key={attachment.id} className="flex items-center mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
                <a 
                  href={attachment.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline text-sm"
                >
                  {attachment.name}
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const PostPreview = ({ post, onPublish }: { post: GeneratedPost; onPublish: () => void }) => {
  return (
    <div className="bg-white border border-gray-200 p-4 rounded-lg mb-4 shadow-sm">
      <h3 className="font-semibold text-lg mb-2">Generated LinkedIn Post</h3>
      
      <div className="mt-3">
        <p className="text-gray-800 whitespace-pre-line">{post.content}</p>
      </div>
      
      {post.imageUrl && (
        <div className="mt-3">
          <img 
            src={post.imageUrl} 
            alt="Post image" 
            className="w-full h-60 object-cover rounded-lg"
          />
        </div>
      )}

      {post.tags && post.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span 
              key={tag} 
              className="bg-blue-100 text-blue-800 px-2 py-1 text-xs rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-6 flex justify-between items-center">
        <button
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          onClick={() => {}}
        >
          Regenerate
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          onClick={onPublish}
        >
          Continue to Publish
        </button>
      </div>
    </div>
  );
};

export default function ChatBox() {
  const { messages, sendMessage, uploadFile, isLoading, generatedPost, resetGeneratedPost } = useChat();
  const [inputValue, setInputValue] = useState('');
  const [attachments, setAttachments] = useState<Array<{id: string; name: string; url: string; type: string}>>([]);
  const [isUploading, setIsUploading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((inputValue.trim() || attachments.length > 0) && !isLoading && !isUploading) {
      sendMessage(inputValue, attachments);
      setInputValue('');
      setAttachments([]);
    }
  };

  const handlePublish = () => {
    if (generatedPost) {
      // Store the generated post in localStorage to access it in the publish page
      localStorage.setItem('draftPost', JSON.stringify(generatedPost));
      
      // Reset the generated post in the context
      resetGeneratedPost();
      
      // Navigate to the LinkedIn publish page
      router.push('/linkedin-publish');
    }
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  console.log("attchments11", attachments);
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {

      console.log("Selected file:", e.target.files[0]);
      setIsUploading(true);
      
      try {
        const file = e.target.files[0];
        const result = await uploadFile(file);

        console.log("Uploaded file result:", result);
        
        if (result) {
          setAttachments(prev => [...prev, result]);
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      } finally {
        setIsUploading(false);
        // Clear the input so the same file can be selected again
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    }
  };

  const removeAttachment = (id: string) => {
    setAttachments(prev => prev.filter(attachment => attachment.id !== id));
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white p-4 shadow-sm rounded-t-lg">
        <h1 className="text-xl font-bold">AI Post Generator</h1>
        <p className="text-gray-600">Describe the post you want to create for LinkedIn</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <div className="mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p className="text-center max-w-sm">
              Start by describing the type of LinkedIn post you want to create. Be specific about your content, tone, and goals.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {generatedPost && (
              <PostPreview post={generatedPost} onPublish={handlePublish} />
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
       <div className="p-4 bg-white border-t border-gray-200 rounded-b-lg">
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {attachments.map(attachment => (
              <div key={attachment.id} className="flex items-center bg-gray-300 rounded-full px-3 py-4">
               
                <span className="text-sm truncate max-w-[150px]">{attachment.name}</span>
                <button 
                  onClick={() => removeAttachment(attachment.id)}
                  className="ml-2 text-gray-500 hover:text-red-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          
          <button
            type="button"
            onClick={handleFileClick}
            disabled={isLoading || isUploading}
            className={`p-2 rounded-full mr-2 ${
              isLoading || isUploading
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-600 hover:bg-blue-100'
            }`}
            title="Attach a file"
          >
            {isUploading ? (
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            )}
          </button>
          
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            disabled={isLoading || isUploading}
            className="flex-1 border border-gray-300 rounded-l-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isLoading || isUploading || (!inputValue.trim() && attachments.length === 0)}
            className={`bg-blue-600 text-white rounded-r-lg py-2 px-4 ${
              isLoading || isUploading || (!inputValue.trim() && attachments.length === 0)
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-blue-700'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </span>
            ) : (
              'Send'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
