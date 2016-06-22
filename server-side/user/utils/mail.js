

function confirmMail(user, code) {
  return {
    from: 'Skeleton Server <mail@yushiwang.ca>',
    to: 'jasper.ys.wang@gmail.com',
    subject: 'Hello from Skeleton Server',
    text: `
Hello ${user.email},
You have successfully created a account on Skeleton Server!
Please confirm your email address by clicking on the link below.
https://localhost.com/users/${user.id}
Or use a cofirmation code below.
${code}
`
  };
}

export { confirmMail };
