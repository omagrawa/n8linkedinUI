
'use client';
import { useEffect, useState } from 'react';
import { useLinkedin, PostSuggestion } from '../contexts/LinkedinContext';
import { useChannels } from '../contexts/ChannelsContext';

// Post preview component
const PostPreview = ({ post, channelDetails, generateImageHandle }: { post: PostSuggestion, channelDetails: any, generateImageHandle: (prompt: string) => void }) => {
  const [generateImageEnable, setGenerateImageEnable] = useState(false);
  const [imagePrompt, setImagePrompt] = useState('');
  return (
    <div className="bg-white border border-gray-200 p-4 rounded-lg mb-4 shadow-sm">
      <div className="flex items-start">
        <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center">
          <span className="text-white font-bold text-xl">P</span>
        </div>
        <div className="ml-4 flex-1">
          <div className="font-semibold">{channelDetails?.userName || ""}</div>
          <div className="text-sm text-gray-500">Just now · LinkedIn Post</div>
        </div>
      </div>
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
      {generateImageEnable ? (
        <div className='mt-3 flex justify-between items-center gap-3'>
          <input onChange={(e:any)=> setImagePrompt(e.target.value)} type='text' placeholder='enter image prompt...' className='mt-3 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' />
          <button onClick={()=> generateImageHandle(imagePrompt)} className='mt-3 bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 focus:outline-none' >Generate</button>
          <button onClick={()=> setGenerateImageEnable(false)} className='mt-3 bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 focus:outline-none' >Cancel</button>
        </div>)
        :
        <div>
          <button onClick={()=> setGenerateImageEnable(true)} className='mt-3 bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 focus:outline-none'>
            Generate AI Image
          </button>
        </div>
      }
      <div className="mt-3 border-t border-gray-100 pt-3 flex">
        <div className="flex items-center mr-4 text-gray-500">
          <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
          </svg>
          <span>87</span>
        </div>
        <div className="flex items-center mr-4 text-gray-500">
          <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
          </svg>
          <span>24</span>
        </div>
        <div className="flex items-center text-gray-500">
          <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          <span>5</span>
        </div>
        <div className="ml-auto">
          {post.estimatedEngagement && (
            <span className={`px-2 py-1 text-xs rounded-full ${
              post.estimatedEngagement === 'Very High' ? 'bg-green-100 text-green-800' : 
              post.estimatedEngagement === 'High' ? 'bg-blue-100 text-blue-800' : 
              post.estimatedEngagement === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
              'bg-gray-100 text-gray-800'
            }`}>
              {post.estimatedEngagement} Engagement
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// Suggestion card component
const SuggestionCard = ({ 
  suggestion, 
  isSelected, 
  onSelect 
}: { 
  suggestion: PostSuggestion; 
  isSelected: boolean;
  onSelect: (suggestion: PostSuggestion) => void;
}) => {
  return (
    <div 
      className={`$${
        isSelected 
          ? 'border-2 border-blue-500 bg-blue-50'
          : 'border border-gray-200 bg-white hover:border-blue-300'
      } p-4 rounded-lg mb-4 cursor-pointer transition-all`}
      onClick={() => onSelect(suggestion)}
    >
      <p className="text-gray-800 line-clamp-3">{suggestion.content}</p>
      <div className="mt-3 flex justify-between items-center">
        <div className="flex flex-wrap gap-2">
          {suggestion.tags && suggestion.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 text-xs rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      </div>
      {suggestion.imageUrl && (
        <div className="mt-2">
          <div className="h-24 w-full rounded-md bg-gray-100 relative overflow-hidden">
            <img 
              src={suggestion.imageUrl} 
              alt="Suggestion image" 
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      )}
      {isSelected && (
        <div className="mt-3 text-blue-600 font-medium flex items-center">
          <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Selected
        </div>
      )}
    </div>
  );
};

export default function LinkedinPostGenerator({ initialDraft = null }: { initialDraft?: PostSuggestion | null }) {
  const { 
    suggestions, 
    selectedSuggestion, 
    isLoading, 
    error, 
    fetchSuggestions, 
    selectSuggestion,
    publishPost,
    generateImageHandle
  } = useLinkedin();
  const { 
    channels, 
    connectChannel, 
    disconnectChannel,
    refreshChannels
  } = useChannels();
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);
  const [publishError, setPublishError] = useState<string | null>(null);
  const channelDetails = channels.find(channel => channel.type === 'linkedin');
  useEffect(() => {
    fetchSuggestions();
  }, []);
  useEffect(() => {
    if (initialDraft) {
      selectSuggestion(initialDraft);
    }
  }, [initialDraft, selectSuggestion]);
  const handlePublish = async () => {
    if (!selectedSuggestion) return;
    setIsPublishing(true);
    setPublishSuccess(false);
    setPublishError(null);
    try {
      const success = await publishPost(selectedSuggestion);
      if (success) {
        setPublishSuccess(true);
      } else {
        setPublishError('Failed to publish post');
      }
    } catch (err) {
      setPublishError('An unexpected error occurred');
      console.error(err);
    } finally {
      setIsPublishing(false);
    }
  };
  return (
    <>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">LinkedIn Integration</h1>
          <p className="mt-1 text-sm text-gray-500">Generate and publish engaging LinkedIn posts</p>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {publishSuccess && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">
                    Post successfully published to LinkedIn!
                  </p>
                </div>
              </div>
            </div>
          )}
          {(error || publishError) && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">
                    {error || publishError}
                  </p>
                </div>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Post Suggestions</h2>
                <div className="mb-4">
                  <button 
                    onClick={() => fetchSuggestions()} 
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating...
                      </span>
                    ) : 'Generate New Suggestions'}
                  </button>
                </div>
                {isLoading ? (
                  <div className="flex items-center justify-center py-10">
                    <svg className="animate-spin h-10 w-10 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                ) : (
                  <>
                    {suggestions.length === 0 ? (
                      <div className="text-center py-10 text-gray-500">
                        No suggestions available. Click the button above to generate some.
                      </div>
                    ) : (
                      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                        {suggestions.map((suggestion) => (
                          <SuggestionCard
                            key={suggestion.id}
                            suggestion={suggestion}
                            isSelected={selectedSuggestion?.id === suggestion.id}
                            onSelect={selectSuggestion}
                          />
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Preview & Publish</h2>
                {selectedSuggestion ? (
                  <>
                    <PostPreview generateImageHandle={generateImageHandle} post={selectedSuggestion} channelDetails={channelDetails} />
                    <div className="mt-6 flex justify-between items-center gap-6">
                      <button
                        onClick={handlePublish}
                        disabled={isPublishing}
                        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none disabled:bg-green-400"
                      >Schedule Post</button>
                      <button
                        onClick={handlePublish}
                        disabled={isPublishing}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none disabled:bg-blue-400"
                      >
                        {isPublishing ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Publishing to LinkedIn...
                          </span>
                        ) : 'Publish to LinkedIn'}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                    <svg className="w-16 h-16 mb-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" />
                    </svg>
                    <p className="text-lg font-medium">Select a suggestion to preview</p>
                    <p className="mt-2 text-sm">Choose from the suggestions on the left to see a preview here</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
