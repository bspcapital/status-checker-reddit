
export type Status = 'up' | 'down' | 'issues';

export interface DayStatus {
  date: string;
  status: Status;
}

// Generate mock data for the last 90 days
const generateMockData = (): DayStatus[] => {
  const data: DayStatus[] = [];
  const today = new Date();
  
  // Generate statuses with mostly 'up', occasional 'issues', and rare 'down'
  for (let i = 89; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    // Create a weighted random status
    // Most days should be 'up', some 'issues', few 'down'
    const random = Math.random();
    let status: Status = 'up';
    
    if (random > 0.95) {
      status = 'down';
    } else if (random > 0.85) {
      status = 'issues';
    }
    
    data.push({
      date: date.toISOString().split('T')[0],
      status
    });
  }
  
  return data;
};

export const historyData = generateMockData();

// Current status (would be fetched from an API in production)
export const getCurrentStatus = (): { status: Status; message: string } => {
  // For the demo, we'll randomly select a status with weighted probability
  const random = Math.random();
  
  if (random > 0.9) {
    return { 
      status: 'down',
      message: 'Reddit is down right now'
    };
  } else if (random > 0.7) {
    return { 
      status: 'issues',
      message: 'Reddit has issues right now'
    };
  } else {
    return { 
      status: 'up',
      message: 'Reddit is up right now'
    };
  }
};

// Format date for display
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

// Submit user report (in a real app, this would make an API call)
export const submitUserReport = (reportType: 'down' | 'slow'): Promise<void> => {
  // Simulate API call
  return new Promise((resolve) => {
    console.log(`User reported Reddit as: ${reportType}`);
    setTimeout(resolve, 500);
  });
};
