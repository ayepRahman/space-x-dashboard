// a fnction that handle root resolver before passing to the child to resolve
const createResolver = resolver => {
  const baseResolver = resolver;
  baseResolver.createResolver = childResolver => {
    const newResolver = async (root, args, context, info) => {
      await resolver(root, args, context, info);
      return childResolver(root, args, context, info);
    };
    return createResolver(newResolver);
  };
  return baseResolver;
};

export const requiresAuth = createResolver((root, args, { ctxUser }) => {
  console.log('REQUIRE AUTH', ctxUser);

  if (!ctxUser || !ctxUser._id) {
    throw new Error('Not Authenticated');
  }
});

export const requiresAdmin = requiresAuth.createResolver((root, args, { ctxUser }) => {
  // check ctxUser value isAdmin boolean
  if (!ctxUser.isAdmin) {
    throw new Error('Requires admin access');
  }
});

export const requiresOwner = requiresAuth.createResolver((root, args, { ctxUser }) => {
  // check user value isAdmin boolean
  if (!ctxUser.isOwner) {
    throw new Error('Requires Owner access');
  }
});
