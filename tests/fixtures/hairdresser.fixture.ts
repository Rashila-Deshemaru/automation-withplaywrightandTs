export type hairdresserData = {
  customerName: string;
  rating: number;
  comment: string;
};

export const hairdresserFixture = {
  positive(): hairdresserData {
    return {
      customerName: "John Doe",
      rating: 5,
      comment: "Excellent service and very professional",
    };
  },

  negative(): hairdresserData {
    return {
      customerName: "Doe John",
      rating: 2,
      comment: "Poor service and unprofessional",
    };
  },
};
