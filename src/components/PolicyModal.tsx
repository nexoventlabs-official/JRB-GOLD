import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface PolicyModalProps {
  title: string;
  content: string;
  isOpen: boolean;
  onClose: () => void;
}

export function PolicyModal({ title, content, isOpen, onClose }: PolicyModalProps) {
  const formatContent = (text: string) => {
    return text.split('\n\n').map((paragraph, index) => {
      // Check if it's a heading (starts with capital letter and is short)
      if (paragraph.length < 50 && paragraph.match(/^[A-Z][^.]*$/)) {
        return (
          <h3 key={index} className="text-xl font-bold text-gray-900 mt-8 mb-4 first:mt-0 border-b border-yellow-200 pb-2">
            {paragraph}
          </h3>
        );
      }
      
      // Check if it's a subheading (numbered sections)
      if (paragraph.match(/^\d+\./)) {
        return (
          <h4 key={index} className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            {paragraph}
          </h4>
        );
      }
      
      // Check if it's a bullet list
      if (paragraph.includes('•')) {
        const items = paragraph.split('\n').filter(line => line.trim());
        return (
          <ul key={index} className="list-none space-y-2 mb-6 ml-4">
            {items.map((item, itemIndex) => {
              if (item.includes('•')) {
                return (
                  <li key={itemIndex} className="flex items-start">
                    <span className="text-yellow-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700 leading-relaxed">{item.replace('•', '').trim()}</span>
                  </li>
                );
              }
              return (
                <p key={itemIndex} className="text-gray-700 leading-relaxed mb-2">
                  {item}
                </p>
              );
            })}
          </ul>
        );
      }
      
      // Contact information formatting
      if (paragraph.includes('JRB Gold') && paragraph.includes('Address')) {
        const lines = paragraph.split('\n');
        return (
          <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
              Contact Information
            </h4>
            <div className="space-y-2">
              {lines.map((line, lineIndex) => {
                if (line.includes('Address')) {
                  return (
                    <div key={lineIndex} className="flex items-start">
                      <span className="font-medium text-gray-700 min-w-[80px]">Address:</span>
                      <span className="text-gray-600">{line.split('Address -')[1]?.trim()}</span>
                    </div>
                  );
                }
                if (line.includes('Mobile')) {
                  return (
                    <div key={lineIndex} className="flex items-center">
                      <span className="font-medium text-gray-700 min-w-[80px]">Phone:</span>
                      <a href={`tel:+91${line.split('Mobile -')[1]?.trim()}`} className="text-yellow-600 hover:text-yellow-700 transition-colors">
                        +91 {line.split('Mobile -')[1]?.trim()}
                      </a>
                    </div>
                  );
                }
                if (line.includes('Email')) {
                  return (
                    <div key={lineIndex} className="flex items-center">
                      <span className="font-medium text-gray-700 min-w-[80px]">Email:</span>
                      <a href={`mailto:${line.split('Email:')[1]?.trim()}`} className="text-yellow-600 hover:text-yellow-700 transition-colors">
                        {line.split('Email:')[1]?.trim()}
                      </a>
                    </div>
                  );
                }
                if (line.includes('Website')) {
                  return (
                    <div key={lineIndex} className="flex items-center">
                      <span className="font-medium text-gray-700 min-w-[80px]">Website:</span>
                      <a href={line.split('Website:')[1]?.trim()} target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:text-yellow-700 transition-colors">
                        {line.split('Website:')[1]?.trim()}
                      </a>
                    </div>
                  );
                }
                if (line.trim() && !line.includes('JRB Gold') && !line.includes('Address') && !line.includes('Mobile') && !line.includes('Email') && !line.includes('Website')) {
                  return (
                    <div key={lineIndex} className="text-gray-600 ml-[80px]">
                      {line.trim()}
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        );
      }
      
      // Regular paragraphs
      return (
        <p key={index} className="mb-4 text-gray-700 leading-relaxed text-justify">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
        <DialogHeader className="border-b border-gray-200 pb-4">
          <DialogTitle className="text-3xl font-playfair font-bold text-gray-900 text-center">
            {title}
          </DialogTitle>
          <p className="text-gray-600 text-center mt-2">JRB Gold - Transparency & Trust</p>
        </DialogHeader>
        <div className="prose prose-lg max-w-none py-6">
          {formatContent(content)}
        </div>
        <div className="border-t border-gray-200 pt-4 flex justify-center">
          <Button onClick={onClose} className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-2">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
