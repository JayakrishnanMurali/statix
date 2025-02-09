export interface Website {
  id: string;
  user_id: string;
  name: string;
  subdomain: string;
  config: {
    title: string;
    description?: string;
    theme?: string;
  };
  created_at: string;
}

export interface Component {
  id: string;
  type: string;
  config: {
    content?: string;
    style?: Record<string, string>;
    props?: Record<string, unknown>;
  };
  animation?: {
    type?: string;
    duration?: number;
    delay?: number;
    easing?: string;
  };
}
