const LoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      <p className="text-lg animate-pulse">Preparing your interview questions...</p>
      <p className="text-sm text-muted-foreground">This might take a few seconds</p>
    </div>
  );
};

export default LoadingState;