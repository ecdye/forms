export type FormDefinition = {
  id: string;
  title: string;
  description?: string;
  pages: FormPage[];
};

export type FormPage = {
  id: string;
  title: string;
  questions: FormQuestion[];
  next?: ConditionalNext; // jump logic at page level
};

export type FormQuestion = {
  id: string;
  type: 'text' | 'number' | 'select' | 'checkbox' | 'radio';
  label: string;
  options?: string[]; // if select/checkbox/radio
  required?: boolean;
  next?: ConditionalNext; // jump logic at question level
};

export type ConditionalNext =
  | { type: 'static'; targetPageId: string }
  | {
    type: 'conditional';
    conditions: Array<{
      value: string | number;
      targetPageId: string;
    }>;
    defaultTarget?: string;
  };
