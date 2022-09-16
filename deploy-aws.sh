COMPOSER_INSTALLER_FILEPATH='install-composer.sh'

if test -f "$COMPOSER_INSTALLER_FILEPATH"; then
    echo "Composer installer file exists"
else
    echo "Composer installer file does not exist."
    echo "Run this script in the root of the repository."
fi

git pull

echo 'git pull complete'

sudo cp -r . /opt/lampp/htdocs/dgvs_pnvev

echo 'copy complete'
echo 'Deploy complete'